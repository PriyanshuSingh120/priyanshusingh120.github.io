// Wait for the window to load
window.onload = function() {
    var button = document.getElementById('autoClickButton');
        // Trigger a click on the button
    if (button) {
        button.click();
    }
};
function downloadSelectedFiles() {
      var form = document.getElementById('fileForm');
      var checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');

      if (checkboxes.length === 0) {
        alert('Please select at least one file.');
        return;
      }

      var zip = new JSZip();

      checkboxes.forEach(function (checkbox) {
        var fileName = checkbox.value;

        // Replace this with your actual content retrieval mechanism
        var fileContent = '';
        if (fileName === 'alarm.py') {
          fileContent = `import time #replace all "/" with opposite of this sign it is not writable
from playsound import playsound
import colorama
from colorama import Fore
import sys

while True:
    Current_Time = time.strftime("%H:%M:%S", time.localtime())
    print(Fore.LIGHTMAGENTA_EX + Current_Time + Fore.RESET)
    Alarm_Time = input(Fore.LIGHTBLUE_EX + 'Enter the time at you apply alarm in 24 hours format: HH:MM:SS: ' + Fore.LIGHTRED_EX)

    hours = Alarm_Time[0] + Alarm_Time[1]
    minute = Alarm_Time[3] + Alarm_Time[4]
    second = Alarm_Time[6] + Alarm_Time[7]

    if int(hours) >= 24 or int(minute) >= 60 or int(second) >= 60:
        print(Fore.LIGHTGREEN_EX + 'Check your input/nincorrect input', Fore.WHITE)
        continue
    else:
        print(Fore.LIGHTCYAN_EX + 'Alarm successfully set..' + Fore.RESET)
        print(Fore.LIGHTYELLOW_EX + 'your alarm ring at', Alarm_Time + Fore.RESET)

    while 1:
        current_Time = time.strftime("%H:%M:%S", time.localtime())
        current_Hours = current_Time[0] + current_Time[1]
        current_Miutes = current_Time[3] + current_Time[4]
        current_Seconds = current_Time[6] + current_Time[7]

        if hours == current_Hours and minute == current_Miutes and second == current_Seconds:
            print(Fore.GREEN + '/rIt is ', Alarm_Time + Fore.RESET)
            print(Fore.LIGHTMAGENTA_EX + 'Your time is over' + Fore.RESET)
            playsound('Alarm06.wav')
            break
        else:
            sys.stdout.write(Fore.RED + '/rIt''/'s ' + Fore.LIGHTMAGENTA_EX + current_Time + Fore.RESET)
            continue

    Restart_loop = input(Fore.LIGHTGREEN_EX + 'Do you want to set a new alarm: Yes/No: ' + Fore.LIGHTRED_EX).lower()
    if Restart_loop != 'yes':
        print(Fore.MAGENTA + 'See you Soon' + Fore.RESET)
        quit()
    else:
        print(Fore.LIGHTYELLOW_EX + 'Okay Let''/'s/ set a new Alarm' + Fore.RESET)
        continue`;
        }
        if (fileName === 'Cuboid.py') {
          fileContent = `import turtle
pen =turtle.Turtle()
turtle.fillcolor('red')
turtle.title('Rectangle')
pen.goto(0,0)
for a in range(2):
    turtle.begin_fill()
    pen.forward(160)
    pen.right(90)
    pen.forward(100)
    pen.right(90)
turtle.end_fill()
pen.up()
pen.goto(50,50)
pen.down()
for a in range(2):
    pen.forward(160)
    pen.right(90)
    pen.forward(100)
    pen.right(90)
pen.goto(0,0)
pen.up()
pen.goto(160,0)
pen.down()
pen.goto(210,50)
pen.up()
pen.goto(210,-50)
pen.down()
pen.goto(160,-100)
pen.up()
pen.goto(0,-100)
pen.down()
pen.goto(50,-50)
turtle.end_fill()
turtle.done()`;
        }if (fileName === 'Binary to Decimal.py') {
          fileContent = `while True:
    from colorama import Fore
    print(Fore.LIGHTCYAN_EX+'program to convert Binary number to Decimal Number')
    Input=input(Fore.LIGHTGREEN_EX+'Enter a Binary number:'+Fore.LIGHTBLUE_EX)
    b=len(Input)
    a=int(Input)
    for c in range(b):
        d=int(Input[c])
        if(d>=2):
            print(Fore.RED+str(a) ,' is not a binary number'+Fore.RESET)
            break
    else:
        if(b==1):
            print(Fore.BLUE+str(int(Input)*1))
        if b==2:
            print(Fore.BLUE+str(int(Input[1])*1+int(Input[0])*2))
        if b==3:
            print(Fore.BLUE+str(str(int(Input[2])*1+int(Input[1])*2+int(Input[0])*4)))
        if b==4:
            print(Fore.BLUE+str(int(Input[3])*1+int(Input[2])*2+int(Input[1])*4+int(Input[0])*8))
        if b==5:
            print(Fore.BLUE+str(int(Input[4])*1+int(Input[3])*2+int(Input[2])*4+int(Input[1])*8+int(Input[0])*16))
        if b==6:
            print(Fore.BLUE+str(int(Input[5])*1+int(Input[4])*2+int(Input[3])*4+int(Input[2])*8+int(Input[1])*16+int(Input[0])*32))
        if b==7:
            print(Fore.BLUE+str(int(Input[6])*1+int(Input[5])*2+int(Input[4])*4+int(Input[3])*8+int(Input[2])*16+int(Input[1])*32+int(Input[0])*64))
        if b==8:
            print(Fore.BLUE+str(int(Input[6])*1+int(Input[5])*2+int(Input[4])*4+int(Input[3])*8+int(Input[2])*16+int(Input[1])*32+int(Input[0])*64+int(Input[0])*128))
        if(b>=9):
            print('Work in progress\\nPlesae wait')
    Reinput=input(Fore.LIGHTMAGENTA_EX+'Do you want to restart: Yes/No: '+Fore.LIGHTBLUE_EX).capitalize()
    if Reinput!='Yes':
        print(Fore.RED+'See You Soon\\nThank You'+Fore.RESET)
        break
    else:
        continue
    `;
        }if (fileName === 'Decimal to Binary.py') {
          fileContent = `while True:
    a=input('Enter a number:')
    try:
        a=int(a)
    except ValueError:
        print(a,'is not Integer')
        continue
    i='0'
    for c in range(a):
        if(a%2==0):
            a=a/2
            i=i+"0"
        if(a%2==1):
            a=(a-1)/2
            i=i+'1'
        if a<=0:
            break
    for d in range(int(len(i))-1,0,-1):
        print(i[d],end=" ")
    c=input('\\nDo you want one more conversion: yes/No: ').lower()
    if c !='yes':
        print('Thanks for comming\\nSee You soon')
        quit()`;
        }if (fileName === 'Calculator.py') {
          fileContent = `from colorama import Fore
print(Fore.LIGHTCYAN_EX+'''
1. for Addition
2. for subtraction
3. for multiplication
4. for division
5. for square root
6. for squre
''')
while True:
    a= int(input(Fore.LIGHTGREEN_EX+'Enter Your choise: 1/2/3/4/5/6: '+Fore.LIGHTBLUE_EX))
    if a in (1,2,3,4,5,6):
        if(a==1):
            b=float(input(Fore.LIGHTMAGENTA_EX+'Enter first number:'+Fore.LIGHTBLUE_EX))
            c=float(input(Fore.LIGHTMAGENTA_EX+'Enter second number:'+Fore.LIGHTBLUE_EX))
            print(Fore.LIGHTYELLOW_EX+'Answer=',b+c)
        if(a==2):
            d=float(input(Fore.LIGHTMAGENTA_EX+'Enter first number:'+Fore.LIGHTBLUE_EX))
            e=float(input(Fore.LIGHTMAGENTA_EX+'Enter second number:'+Fore.LIGHTBLUE_EX))
            print(Fore.LIGHTYELLOW_EX+'Answer =',d-e)
        if(a==3):
            d=float(input(Fore.LIGHTMAGENTA_EX+'Enter first number:'+Fore.LIGHTBLUE_EX))
            e=float(input(Fore.LIGHTMAGENTA_EX+'Enter second number:'+Fore.LIGHTBLUE_EX))
            print(Fore.LIGHTYELLOW_EX+'Answer =',d*e)
        if(a==4):
            d=float(input(Fore.LIGHTMAGENTA_EX+'Enter first number:'+Fore.LIGHTBLUE_EX))
            e=float(input(Fore.LIGHTMAGENTA_EX+'Enter second number:'+Fore.LIGHTBLUE_EX))
            print(Fore.LIGHTYELLOW_EX+'Answer =',d/e)
        if(a==6):
            d=float(input(Fore.LIGHTMAGENTA_EX+'Enter a number:'+Fore.LIGHTBLUE_EX))
            print(Fore.LIGHTYELLOW_EX+'square =',d*d)
        if(a==5):
            d=int(input(Fore.LIGHTMAGENTA_EX+'Enter a number:'+Fore.LIGHTBLUE_EX))
            for c in range(1,int(d/2)):
                if(c*c==d):
                    print(Fore.LIGHTYELLOW_EX+'Square root = ',c)
                else:
                    print('Square root for this number is not valid\\nTry again')
    z=input(Fore.LIGHTWHITE_EX+'Do you want a new conversion: Yes/No: '+Fore.LIGHTBLUE_EX).upper
    if z=='YES':
        continue
    elif z !="YES":
        print(Fore.RED+'See you soon\\n We saw you later\\n\\tThanks for using our code'+Fore.RESET)
        break


    `;
        }if (fileName === 'Diamond.py') {
          fileContent = `n=int(input('Enter number of row :\\n'))
for i in range(n-1):
    for j in range(i,n):
        print(' ', end=' ')
    for a in range(i):
        print('*', end=' ')
    for b in range(i+1):
        print('*', end=' ')
    print()
for x in range(n):
    for b in range(x+1):
        print(' ', end=' ')
    for v in range(x,n-1):
        print('*', end=' ')
    for f in range(x,n):
        print('*', end=' ')
    print()
`;
        }if (fileName === 'Fraction.py') {
          fileContent = `while True:
    v=int(input('''
1. for Fraction Addtion
2. for Fraction Substraction
Enter your choice: 1/2: '''))
    if v in[1,2]:
        first=input("Enter First Number in form of p/q : ")
        second=input("Enter Second Number in form of p/q : ")
        a=int(first[0])
        b=int(first[2])
        c=int(second[0])
        d=int(second[2])
        if b==0 or d==0:
            print('\\n\\t0 is not a rational number')
            continue
        e=b
        f=d
        n=1
        for m in range(1,e+f):
            if e%m==0 and f%m==0:
                e=e/m
                f=f/m
                n=n*m
            elif e%m==0 and f%m==0:
                e=e/m
                f=f/m
                n=n*m
            elif e%m==0 and f%m==0:
                e=e/m
                f=f/m
                n=n*m
            elif e%m==0 and f%m==0:
                e=e/m
                f=f/m
                n=n*m
            elif e%m==0 and f%m==0:
                e=e/m
                f=f/m
                n=n*m
            elif e%m==0 and f%m==0:
                e=e/m
                f=f/m
                n=n*m
            g=n*e*f
        h=(g/b)*a
        i=(g/d)*c
        if v==1:
            print(h+i,'/',g)
        elif v==2:
            print(h-i,'/',g)
    if v>2:
        print('incorrect Input')
    z=input('Do you want a new calculation: Yes/No: ').lower()
    if z !='yes':
        print('See you Soon\\nThanks for Comming\\n')
        quit()
    
`;
        }if (fileName === 'Odd Sum.py') {
          fileContent = `def oddSum(n) :
    sum = 0
    curr = 1
    i = 0
    while i < n:
        sum = sum + curr
        curr = curr + 2
        i = i + 1
    return sum
 
# Driver Code
n = int(input("Enter number at which you want the sum: "))
print (" Sum of first" , n, "Odd Numbers is: ",
                                oddSum(n) )
`;
        }if (fileName === 'smartphone.py') {
          fileContent = `import turtle
screen=turtle.Turtle()
turtle.title('Redmi Note 5 Pro')
#body
screen.goto(0,0)
for a in range(2):
    screen.forward(160)
    screen.right(90)
    screen.forward(300)
    screen.right(90)
screen.up()
#Header Camera and speaker
screen.goto(0,-20)
screen.down()
screen.forward(160)
screen.up()
screen.goto(30,-12)
screen.down()
screen.circle(3)
screen.up()
screen.goto(80,-8)
screen.down()
for b in range(2):
    screen.forward(15)
    screen.right(90)
    screen.forward(4)
    screen.right(90)
screen.up()
screen.goto(0,-280)
screen.down()
screen.forward(160)
screen.up()
screen.goto(18,-287)
screen.down()
screen.right(90)
for c in range(3):
    screen.forward(7)
    screen.right(120)
screen.up()
screen.goto(75,-290)
screen.down()
screen.circle(3)
screen.up()
screen.goto(140,-287)
screen.down()
for d in range(4):
    screen.forward(5)
    screen.right(90)
screen.up()
screen.goto(80,-130)
screen.down()
screen.write("Nothing\\nIts Done")
screen.up()
screen.goto(70,70)
turtle.done()`;
        }if (fileName === 'Timer.py') {
          fileContent = `import sys
import time
from colorama import Fore
from playsound import playsound 
while True:
    Input=input(Fore.LIGHTBLUE_EX+'Enter the time HH:MM:SS : '+Fore.LIGHTCYAN_EX)
    try:
        Hours_1=0
        Minutes_1=0
        Seconds_1=0
        Hours=int(Input[0]+Input[1])
        Minutes=int(Input[3]+Input[4])
        Seconds=int(Input[6]+Input[7])
        print(Fore.LIGHTRED_EX+'Timer Successfully Set..'+Fore.RESET)
    except ValueError:
        print(Fore.RED+'Invalid Input'+Fore.RESET)
        continue
    while 1:
        if Seconds_1==60:
            Minutes_1=Minutes_1+1
            Seconds_1=0
        if Minutes_1==60:
            Hours_1=Hours_1+1
            Minutes_1=Minutes_1-1
        if Hours_1==Hours and Minutes==Minutes_1 and Seconds==Seconds_1:
            print(Fore.LIGHTGREEN_EX+'\\nTime end'+Fore.RESET)
            playsound('clock-alarm-8761.mp3')
            break
        else:
            Seconds_1= Seconds_1+1
            sys.stdout.write(Fore.LIGHTMAGENTA_EX+'\\r'+str(Hours_1)+' : '+str(Minutes_1)+' : '+str(Seconds_1)+' Time left'+Fore.RESET)
            time.sleep(0.98899999999999999999)
            continue
    Restart_Input=input(Fore.LIGHTMAGENTA_EX+"Do you want to restart Loop: Yes/No: "+Fore.LIGHTWHITE_EX).capitalize()
    if Restart_Input=='Yes':
        continue
    else:
        print(Fore.LIGHTRED_EX+'Okay! See you Soon\\n Thank You'+Fore.RESET)
        quit()`;
        }if (fileName === 'Tic Tac Toe.py') {
          fileContent = `import tkinter as tk
from itertools import cycle
from tkinter import font
from typing import NamedTuple

class Player(NamedTuple):
    label: str
    color: str

class Move(NamedTuple):
    row: int
    col: int
    label: str = ""

BOARD_SIZE = 3
DEFAULT_PLAYERS = (
    Player(label="X", color="blue"),
    Player(label="O", color="green"),
)

class TicTacToeGame:
    def __init__(self, players=DEFAULT_PLAYERS, board_size=BOARD_SIZE):
        self._players = cycle(players)
        self.board_size = board_size
        self.current_player = next(self._players)
        self.winner_combo = []
        self._current_moves = []
        self._has_winner = False
        self._winning_combos = []
        self._setup_board()

    def _setup_board(self):
        self._current_moves = [
            [Move(row, col) for col in range(self.board_size)]
            for row in range(self.board_size)
        ]
        self._winning_combos = self._get_winning_combos()

    def _get_winning_combos(self):
        rows = [
            [(move.row, move.col) for move in row]
            for row in self._current_moves
        ]
        columns = [list(col) for col in zip(*rows)]
        first_diagonal = [row[i] for i, row in enumerate(rows)]
        second_diagonal = [col[j] for j, col in enumerate(reversed(columns))]
        return rows + columns + [first_diagonal, second_diagonal]

    def toggle_player(self):
        """Return a toggled player."""
        self.current_player = next(self._players)

    def is_valid_move(self, move):
        """Return True if move is valid, and False otherwise."""
        row, col = move.row, move.col
        move_was_not_played = self._current_moves[row][col].label == ""
        no_winner = not self._has_winner
        return no_winner and move_was_not_played

    def process_move(self, move):
        """Process the current move and check if it's a win."""
        row, col = move.row, move.col
        self._current_moves[row][col] = move
        for combo in self._winning_combos:
            results = set(self._current_moves[n][m].label for n, m in combo)
            is_win = (len(results) == 1) and ("" not in results)
            if is_win:
                self._has_winner = True
                self.winner_combo = combo
                break

    def has_winner(self):
        """Return True if the game has a winner, and False otherwise."""
        return self._has_winner

    def is_tied(self):
        """Return True if the game is tied, and False otherwise."""
        no_winner = not self._has_winner
        played_moves = (
            move.label for row in self._current_moves for move in row
        )
        return no_winner and all(played_moves)

    def reset_game(self):
        """Reset the game state to play again."""
        for row, row_content in enumerate(self._current_moves):
            for col, _ in enumerate(row_content):
                row_content[col] = Move(row, col)
        self._has_winner = False
        self.winner_combo = []

class TicTacToeBoard(tk.Tk):
    def __init__(self, game):
        super().__init__()
        self.title("Tic-Tac-Toe Game")
        self._cells = {}
        self._game = game
        self._create_menu()
        self._create_board_display()
        self._create_board_grid()

    def _create_menu(self):
        menu_bar = tk.Menu(master=self)
        self.config(menu=menu_bar)
        file_menu = tk.Menu(master=menu_bar)
        file_menu.add_command(label="Play Again", command=self.reset_board)
        file_menu.add_separator()
        file_menu.add_command(label="Exit", command=quit)
        menu_bar.add_cascade(label="File", menu=file_menu)

    def _create_board_display(self):
        display_frame = tk.Frame(master=self)
        display_frame.pack(fill=tk.X)
        self.display = tk.Label(
            master=display_frame,
            text="Ready?",
            font=font.Font(size=28, weight="bold"),
        )
        self.display.pack()

    def _create_board_grid(self):
        grid_frame = tk.Frame(master=self)
        grid_frame.pack()
        for row in range(self._game.board_size):
            self.rowconfigure(row, weight=1, minsize=50)
            self.columnconfigure(row, weight=1, minsize=75)
            for col in range(self._game.board_size):
                button = tk.Button(
                    master=grid_frame,
                    text="",
                    font=font.Font(size=36, weight="bold"),
                    fg="black",
                    width=3,
                    height=2,
                    highlightbackground="lightblue",
                )
                self._cells[button] = (row, col)
                button.bind("<ButtonPress-1>", self.play)
                button.grid(row=row, column=col, padx=5, pady=5, sticky="nsew")

    def play(self, event):
        """Handle a player's move."""
        clicked_btn = event.widget
        row, col = self._cells[clicked_btn]
        move = Move(row, col, self._game.current_player.label)
        if self._game.is_valid_move(move):
            self._update_button(clicked_btn)
            self._game.process_move(move)
            if self._game.is_tied():
                self._update_display(msg="Tied game!", color="red")
            elif self._game.has_winner():
                self._highlight_cells()
                msg = f'Player "{self._game.current_player.label}" won!'
                color = self._game.current_player.color
                self._update_display(msg, color)
            else:
                self._game.toggle_player()
                msg = f"{self._game.current_player.label}'s turn"
                self._update_display(msg)

    def _update_button(self, clicked_btn):
        clicked_btn.config(text=self._game.current_player.label)
        clicked_btn.config(fg=self._game.current_player.color)

    def _update_display(self, msg, color="black"):
        self.display["text"] = msg
        self.display["fg"] = color

    def _highlight_cells(self):
        for button, coordinates in self._cells.items():
            if coordinates in self._game.winner_combo:
                button.config(highlightbackground="red")

    def reset_board(self):
        """Reset the game's board to play again."""
        self._game.reset_game()
        self._update_display(msg="Ready?")
        for button in self._cells.keys():
            button.config(highlightbackground="lightblue")
            button.config(text="")
            button.config(fg="black")

def main():
    """Create the game's board and run its main loop."""
    game = TicTacToeGame()
    board = TicTacToeBoard(game)
    board.mainloop()

if __name__ == "__main__":
    main()`;
        }
        // Add the file to the zip
        zip.file(fileName, fileContent);
      });

      // Generate the zip file asynchronously
      zip.generateAsync({ type: 'blob' })
        .then(function (content) {
          // Create a download link and trigger the download
          var a = document.createElement('a');
          var url = URL.createObjectURL(content);
          a.href = url;
          a.download = 'selected_files.zip'; // Change the filename as needed
          document.body.appendChild(a);
          a.click();

          // Clean up the URL.createObjectURL
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        });
    }