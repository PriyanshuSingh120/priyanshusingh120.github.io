import math
from turtle import *

def hearta(k):
    return 15 * math.sin(k) ** 3

def heartb(k):
    return 13 * math.cos(k) - 5 * math.cos(2*k) - 2 * math.cos(3*k) - math.cos(4*k)

# Setup
speed(0) 
delay(0)
bgcolor("black")
pensize(2)

# Start drawing the main Heart
penup()
color("#f73487")
goto(hearta(0)*20, heartb(0)*20)
pendown()

for i in range(6000):
    goto(hearta(i)*20, heartb(i)*20)
    
    # Trigger at 150
    if i == 150:
        curr_pos = pos()
        
        # --- THE AESTHETIC NEON "A" ---
        def draw_neon_a(c, p):
            color(c)
            pensize(p)
            # Left Leg
            penup(); goto(-40, -50); pendown()
            goto(0, 70) 
            # Right Leg
            goto(40, -50)
            # Floating Aesthetic Crossbar (Slightly curved)
            penup(); goto(-20, 0); setheading(-15); pendown()
            circle(80, 30)

        # 1. Draw the "Glow" (Thick & Blurred)
        draw_neon_a("#8a003c", 15) # Dark Magenta glow
        draw_neon_a("#f73487", 8)  # Bright Pink glow
        
        # 2. Draw the "Core" (The bright center)
        draw_neon_a("white", 2)

        # --- AESTHETIC ACCENTS (Floating Hearts) ---
        def dot_heart(x, y, s):
            penup(); goto(x, y); color("white")
            dot(s) # Simple aesthetic dots to frame the A

        dot_heart(-60, 60, 6)
        dot_heart(60, -20, 4)
        dot_heart(45, 80, 5)

        # Reset for Main Heart
        penup()
        color("#f73487")
        pensize(2)
        goto(curr_pos)
        setheading(0)
        pendown()

hideturtle()
done()
