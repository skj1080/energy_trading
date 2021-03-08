import socket
import RPi.GPIO as GPIO
import time
import os
import json

import math
file1=open('d:/demand.txt','r'); lines.demand=file1.readlines()
file1.close()
file2=open('d:/supply.txt','r'); lines.supply=file2.readlines()
file2.close()
price = 계산하기
f = open("d:price.txt", 'w'); f.write(price);
f.close()


HOST2 = 'DSO IP박기'
PORT2 = 8091

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((HOST2, PORT2))
s.listen(10)




def gettingMsga():
    global setbuy,amountbuy,setsell,amountsell
    data = conn.recv(1024)
    data1 = data.decode("utf-8")
    data2 = json.loads(data1)
    print(data2)
    setbuy = data2.get("0")
    amountbuy = data2.get("1")
    setsell = data2.get("2")
    amountsell = data2.get("3")
    conn.close()


conn, addr = s.accept()
gettingMsga()




HOST = "192.168.0.17"
PORT = 8094

GPIO.setmode(GPIO.BOARD)
e, e1, e2, e3 = 0, 0, 0, 0
count = 0


def sendingMsg():
    data = str(e)
    data = bytes(data, "utf-8")
    s.send(data)


def gettingMsg():
    while True:
        sendingMsg()
        data = s.recv(1024)
        if not data:
            sendingMsg()
            break
        else:
            data = str(data).split("b'", 1)[1].rsplit("'", 1)[0]
            break
    s.close()


def light_sensor():
    count = 0

    GPIO.setup(7, GPIO.OUT)
    GPIO.output(7, GPIO.LOW)
    time.sleep(0.5)
    GPIO.setup(7, GPIO.IN)
    while (GPIO.input(7) == GPIO.LOW):
        count += 1
    return 2000 - count


def LEDvar(e):
    GPIO.setup(29, GPIO.OUT)
    GPIO.setup(31, GPIO.OUT)
    GPIO.setup(33, GPIO.OUT)
    GPIO.setup(35, GPIO.OUT)
    GPIO.setup(37, GPIO.OUT)
    GPIO.setup(40, GPIO.OUT)
    if e < 40:
        GPIO.output(29, 0)
        GPIO.output(31, 0)
        GPIO.output(33, 0)
        GPIO.output(35, 0)
        GPIO.output(37, 0)
        GPIO.output(40, 0)
    elif e >= 40 and e < 80:
        GPIO.output(29, 1)
        GPIO.output(31, 0)
        GPIO.output(33, 0)
        GPIO.output(35, 0)
        GPIO.output(37, 0)
        GPIO.output(40, 0)
    elif e >= 80 and e < 120:
        GPIO.output(29, 1)
        GPIO.output(31, 1)
        GPIO.output(33, 0)
        GPIO.output(35, 0)
        GPIO.output(37, 0)
        GPIO.output(40, 0)
    elif e >= 120 and e < 160:
        GPIO.output(29, 1)
        GPIO.output(31, 1)
        GPIO.output(33, 1)
        GPIO.output(35, 0)
        GPIO.output(37, 0)
        GPIO.output(40, 0)
    elif e >= 160 and e < 200:
        GPIO.output(29, 1)
        GPIO.output(31, 1)
        GPIO.output(33, 1)
        GPIO.output(35, 1)
        GPIO.output(37, 0)
        GPIO.output(40, 0)
    elif e >= 200 and e < 240:
        GPIO.output(29, 1)
        GPIO.output(31, 1)
        GPIO.output(33, 1)
        GPIO.output(35, 1)
        GPIO.output(37, 1)
        GPIO.output(40, 0)
    elif e >= 240 and e < 280:
        GPIO.output(29, 1)
        GPIO.output(31, 1)
        GPIO.output(33, 1)
        GPIO.output(35, 1)
        GPIO.output(37, 1)
        GPIO.output(40, 1)


def small_LED():
    global e2
    GPIO.setup(38, GPIO.IN)
    GPIO.setup(36, GPIO.OUT)
    input_value = GPIO.input(38)
    if input_value == False and e > 0:
        GPIO.output(36, True)
        e2 = - 5
        return input_value
    else:
        GPIO.output(36, False)
        e2 = 0
        return input_value


def myEnergy():
    f = open("/home/pi/Desktop/blockchain/contract/Efrom.txt", 'r')
    sender = f.readlines()
    num = len(sender)
    f.close()

    g = open("/home/pi/Desktop/blockchain/contract/Eto.txt", 'r')
    receiver = g.readlines()
    g.close()

    h = open("/home/pi/Desktop/blockchain/contract/Evalue.txt", 'r')
    amount = h.readlines()
    h.close()

    ad = [0 for i in range(4)]

    ad[0] = "0xafa7198a6ac9569c5c57867d8f522ad24c5bb1a2"

    a = 0
    b = 0

    for i in range(0, num):
        # sender[0]
        if sender[i][:-1] == ad[0]:
            a = a + int(amount[i][:-1])

    for i in range(0, num):
        # Receiver[0]
        if receiver[i][:-1] == ad[0]:
            b = b + int(amount[i][:-1])

    c = -a + b
    f = open("/home/pi/Desktop/blockchain/contract/Eto.txt", 'w')
    f.write('0\n')
    f.close()
    f = open("/home/pi/Desktop/blockchain/contract/Efrom.txt", 'w')
    f.write('0\n')
    f.close()
    f = open("/home/pi/Desktop/blockchain/contract/Evalue.txt", 'w')
    f.write('0\n')
    f.close()

    file = open("/home/pi/Desktop/blockchain/contract/tradedE.txt", 'w')
    file.write(str(c))
    file.close()



try:
    while True:
        if light_sensor() >= 1920:
            light_sensor()
            e1 = 10
        else:
            e1 = 0
        if small_LED() == True:
            small_LED()

        myEnergy()

        file = open("/home/pi/Desktop/blockchain/contract/tradedE.txt", 'r')
        e3 = int(file.read())
        file.close()
        e += e1 + e2 + e3
        if e >= 280:
            e = 280
        elif e < 0:
            e = 0
        LEDvar(e)
        print(e)
        count += 1
        if count == 30 and f1 == '0':
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.connect((HOST, PORT))
            gettingMsg()
            count: int = 0
        flag = open("/home/pi/Desktop/blockchain/contract/flag.txt", 'r')
        t = flag.read()
        if t == '1':
            f1 = '1'
            flag.close()
        else:
            f1 = '0'
            flag.close()
        if f1 == '1' and (e <= int(setbuy)):
            buyingamount = int(amountbuy) - e
            print(buyingamount)
            x = open("/home/pi/Desktop/blockchain/contract/amount.txt", 'w')
            x.write(str(buyingamount))
            x.close()
            os.system("node /home/pi/Desktop/blockchain/contract/Energybuy.js")
            flag = open("/home/pi/Desktop/blockchain/contract/flag.txt", 'w')
            flag.write("0")
            flag.close()
            while True:
                allfin = open("/home/pi/Desktop/blockchain/contract/allfin.txt", 'r')
                allfin_r = allfin.read()
                allfin.close()
                if allfin_r == '1':
                    allfin = open("/home/pi/Desktop/blockchain/contract/allfin.txt", 'w')
                    allfin.write('0')
                    allfin.close()
                    break
        elif f1 == '1' and (e >= int(setsell)):
            sellingamount = e - int(amountsell)
            print(sellingamount)
            x = open("/home/pi/Desktop/blockchain/contract/amount.txt", 'w')
            x.write(str(sellingamount))
            x.close()
            os.system("node /home/pi/Desktop/blockchain/contract/Energysell.js")
            flag = open("/home/pi/Desktop/blockchain/contract/flag.txt", 'w')
            flag.write("0")
            flag.close()
            while True:
                allfin = open("/home/pi/Desktop/blockchain/contract/allfin.txt", 'r')
                allfin_r = allfin.read()
                allfin.close()
                if allfin_r == '1':
                    allfin = open("/home/pi/Desktop/blockchain/contract/allfin.txt", 'w')
                    allfin.write('0')
                    count= 0
                    allfin.close()


except KeyboardInterrupt:
    GPIO.cleanup()
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(29, GPIO.OUT)
    break


    GPIO.setup(31, GPIO.OUT)
    GPIO.setup(33, GPIO.OUT)
    GPIO.setup(35, GPIO.OUT)
    GPIO.setup(37, GPIO.OUT)
    GPIO.setup(40, GPIO.OUT)
    GPIO.setup(7, GPIO.OUT)
    GPIO.output(29, 0)
    GPIO.output(31, 0)
    GPIO.output(33, 0)
    GPIO.output(35, 0)
    GPIO.output(37, 0)



    GPIO.output(40, 0)
    GPIO.output(7, 0)
finally:
    GPIO.cleanup()

