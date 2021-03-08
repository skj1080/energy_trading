import socket
import os
import math

HOST = '192.168.43.123'
PORT = 8094
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((HOST, PORT))
s.listen(10)
map = dict()
total_energy = 0
a = 0


def f_price():
    global price
    price = 1150.76857 / ((2 * math.pi) ** 0.5) * math.exp(-math.pow(int(total_energy), 2) / 245000) + 300
    price = int(round(price))
    print(price)


def sendingMsg():
    data = 'kkk'
    data = data.encode("utf-8")
    conn.send(data)


def gettingMsg():
    while True:
        data = conn.recv(1024)
        if not data:
            break
        else:
            data = str(data).split("b'", 1)[1].rsplit("'", 1)[0]
            map[addr[0]] = data
            if addr[0] == '192.168.43.90':
                f = open("/var/www/html/txt/Energy1.txt", 'w')
                f.write(data)
                f.close()
            elif addr[0] == '192.168.43.51':
                f = open("/var/www/html/txt/Energy2.txt", 'w')
                f.write(data)
                f.close()
            elif addr[0] == '192.168.43.129':
                f = open("/var/www/html/txt/Energy3.txt", 'w')
                f.write(data)
                f.close()
            elif addr[0] == '192.168.43.161':
                f = open("/var/www/html/txt/Energy4.txt", 'w')
                f.write(data)
                f.close()

            sendingMsg()
    conn.close()


def gettingMsg2():
    data = conn.recv(1024)
    data = str(data).split("b'", 1)[1].rsplit("'", 1)[0]
    map[addr[0]] = data
    sendingMsg()
    conn.close()


while True:
    conn, addr = s.accept()
    print('Connected by', addr)
    gettingMsg()
    print(map)
    count = 0
    for i in map:
        count += 1
        a += int(map[i])
    total_energy = a
    a = 0
    print(total_energy)
    print(count)
    if count == 4:
        f_price()
        p = open('/home/pi/Desktop/blockchain/contract/price.txt', 'w')
        p.write(str(price))
        p.close()
        os.system("node /home/pi/Desktop/blockchain/contract/refresh.js")
        for k in range(0, count):
            conn, addr = s.accept()
            gettingMsg2()
        while True:
            finish = input('buying and selling are finished?[y/n]')
            if finish == 'y':
                break
            else:
                print("press 'y' if everything is done")
        os.system("node /home/pi/Desktop/blockchain/contract/trade.js")
        map = {}

while True:
    pass

