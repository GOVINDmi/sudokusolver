
var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				
				arr[i][j].innerText = board[i][j]
			}

			else{
				//console.log(board[i][j]);
				arr[i][j].innerText = ''
			}
				
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

document.getElementById('GetPuzzle').onclick = function () {
    const difficulty = document.getElementById('difficulty').value;
  
    // Function to fetch the puzzle
    function fetchPuzzle(difficulty) {
      return fetch(`https://sugoku.onrender.com/board?difficulty=${difficulty}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        });
    }
    // Call the fetch function and handle the response
    fetchPuzzle(difficulty)
      .then(response => {
        //console.log(response);
        console.log(response.board);
        board = response.board;
        //console.log(board);
        FillBoard(board);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  };
  


function check(board ,i,j,num,n)
{
    for(let x = 0;x<n;x++)
    {
        if(board[i][x] == num || board[x][j] == num)
        {
            return false;
        }
    }
    let rn = Math.sqrt(n);
	console.log(`${n},${rn}`);
    let si = i - (i%rn);
    let sj = j - (j%rn);

    for(let x = si ;x<si+rn;x++)
    {
        for(let y = sj ;y<sj+rn;y++)
        {
            if(board[x][y] === num)
            {
                return false;
            }
        }
    }
    return true;
}
function SudokuSolver(board, i, j, n) {
	
    if(i == n)
    {
		console.log(board);
        FillBoard(board);
        return true;
    }
     if(j == n)
     {
        return SudokuSolver(board,i+1,0,n);
     }
     if(board[i][j] != 0)
     {
        return SudokuSolver(board,i,j+1,n);
     }
     for(let num = 1;num<=9;num++)
     {
       
		   //console.log(board);

        
            if(check(board,i,j,num,n))
            {
                board[i][j] = num;
				console.log(board);


                if(SudokuSolver(board,i,j+1,n))
                {
                    return true;
                }
               
                board[i][j] = 0;
            
            }
        
       
     }
    return false;
	
}

SolvePuzzle.onclick = () => {
    console.log(board);
	SudokuSolver(board, 0, 0, 9);
};

