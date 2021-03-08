#import socket
import os
import math
from tkinter import *
import numpy as np

#HOST = 'DSO주소'
#PORT = 8094
#s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#s.bind((HOST, PORT))
#s.listen(10)



def f_price():
    global price
    Pmax = 115; Pmin = 71;
    price = round(2/math.pi*(Pmax - Pmin)*math.atan(sellingtotal/buyingtotal)^3+Pmin)
    price = int(round(price))

def inject():
    amount1 = e1.get()
    amount2 = e2.get()
    amount3 = e3.get()
    amount4 = e4.get()
    print( amount1)
    print(amount2)
    print(amount3)
    print(amount4)

   # f = open("amount_inject1.txt")
   # f.write(amount1)
   # f.close()
   # f = open("amount_inject2.txt")
   # f.write(amount2)
   # f.close()
   # f = open("amount_inject3.txt")
   # f.write(amount3)
   # f.close()
   # f = open("amount_inject4.txt")
   # f.write(amount4)
   # f.close()

    #os.system("node 경로/inject_DSO.js") #injcet 실행


#    f=open("amount_inject1.txt")
#    injectamount1 = f.read()
#    f.close
#    f=open("amount_inject2.txt")
#    injectamount2 = f.read()
#    f.close
#    f=open("amount_inject3.txt")
#    injectamount3 = f.read()
#    f.close
#    f=open("amount_inject4.txt")
#    injectamount4 = f.read()
#    f.close

def roundstart():
    os.system("node 경로/roundstart.JS")  # roundstart 실행

def request():
    sellingamount1= e5.get()
    sellingamount2 = e6.get()
    sellingamount3 = e7.get()
    sellingamount4 = e8.get()
    buyingamount1 = e9.get()
    buyingamount2 = e10.get()
    buyingamount3 = e11.get()
    buyingamount4 = e12.get()
    f = open("buyingamount1.txt")
    f.write(buyingamount1)
    f.close()
    f = open("buyingamount2.txt")
    f.write(buyingamount2)
    f.close()
    f = open("buyingamount3.txt")
    f.write(buyingamount3)
    f.close()
    f = open("buyingamount4.txt")
    f.write(buyingamount4)
    f.close()
    f = open("sellingamount1.txt")
    f.write(sellingamount1)
    f.close()
    f = open("sellingamount2.txt")
    f.write(sellingamount2)
    f.close()
    f = open("sellingamount3.txt")
    f.write(sellingamount3)
    f.close()
    f = open("sellingamount4.txt")
    f.write(sellingamount4)
    f.close()


    global buyingtotal
    buyingtotal = buyingamount1 + buyingamount2 + buyingamount3 + buyingamount4

    global sellingtotal
    sellingtotal = sellingamount1 + sellingamount2 + sellingamount3 + sellingamount4
    os.system("node 경로/requestbuy.js")
    os.system("node 경로/requestsell.js")

def match():
    os.system("node 경로/matching.js")

def trade():
    Pmax = 30; 
    Pmin = 100;
    price = round(2/math.pi*(Pmax)*math.atan(np.log(sellingtotal/buyingtotal))^3+Pmin)
    price = int(round(price))
    f=open("price.txt",'w')
    f.write(price)
    f.close()
    os.system("node 경로/trade.js")

parent = Tk()
Label(parent, text= "prosumer1").grid (row=0,column=0)
Label(parent, text= "prosumer2").grid (row=1)
Label(parent, text= "prosumer3").grid (row=2)
Label(parent, text= "prosumer4").grid (row=3)

Label(parent, text= "prosumer1").grid (row=7,column=0)
Label(parent, text= "prosumer2").grid (row=8)
Label(parent, text= "prosumer3").grid (row=9)
Label(parent, text= "prosumer4").grid (row=10)
Label(parent, text= "consumer1").grid (row=11,column=0)
Label(parent, text= "consumer2").grid (row=12)
Label(parent, text= "consumer3").grid (row=13)
Label(parent, text= "consumer4").grid (row=14)

e1 = Entry(parent)
e1.grid(row=0,column=1)
e2 = Entry(parent)
e2.grid(row=1,column=1)
e3 = Entry(parent)
e3.grid(row=2,column=1)
e4 = Entry(parent)
e4.grid(row=3,column=1)

e5 = Entry(parent)
e5.grid(row=7,column=1)
e6 = Entry(parent)
e6.grid(row=8,column=1)
e7 = Entry(parent)
e7.grid(row=9,column=1)
e8 = Entry(parent)
e8.grid(row=10,column=1)
e9 = Entry(parent)
e9.grid(row=11,column=1)
e10 = Entry(parent)
e10.grid(row=12,column=1)
e11 = Entry(parent)
e11.grid(row=13,column=1)
e12 = Entry(parent)
e12.grid(row=14,column=1)

b1 = Button(parent, text="inject",command = inject)
b1.grid(row=5)
b2 = Button(parent, text="round start")#,command = roundstart)
b2.grid(row=6)
b3 = Button(parent, text="request")#, command = request)
b3.grid(row=16)
b4 = Button(parent, text="match")#, command = match)
b4.grid(row=17, column = 0)
b5 = Button(parent, text="trade")#, command = trade)
b5.grid(row=17, column = 1)

mainloop()



