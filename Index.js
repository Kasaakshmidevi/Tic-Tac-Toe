let history = [Array(9).fill(null)];
        let currentMove = 0;

        function xIsNext() {
            return currentMove % 2 === 0;
        }

        function handleClick(i) {
            const squares = history[currentMove].slice();
            if (calculateWinner(squares) || squares[i]) {
                return;
            }

            squares[i] = xIsNext() ? 'X' : 'O';
            history = history.slice(0, currentMove + 1).concat([squares]);
            currentMove = history.length - 1;
            updateBoard();
        }

        function jumpTo(move) {
            currentMove = move;
            updateBoard();
        }

        function updateBoard() {
            const status = document.getElementById('status');
            const squares = history[currentMove];
            const winner = calculateWinner(squares);
            status.textContent = winner ? `Winner: ${winner}` : `Next player: ${xIsNext() ? 'X' : 'O'}`;

            const boardButtons = document.getElementsByClassName('square');
            for (let i = 0; i < boardButtons.length; i++) {
                boardButtons[i].textContent = squares[i];
            }

            const moves = document.getElementById('moves');
            moves.innerHTML = '';
            for (let move = 0; move < history.length; move++) {
                const btn = document.createElement('button');
                btn.textContent = move ? `Go to move #${move}` : 'Go to game start';
                btn.onclick = () => jumpTo(move);

                const li = document.createElement('li');
                li.appendChild(btn);
                moves.appendChild(li);
            }
        }

        function calculateWinner(squares) {
            const lines = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];

            for (let i = 0; i < lines.length; i++) {
                const [a, b, c] = lines[i];
                if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                    return squares[a];
                }
            }
            return null;
        }

        updateBoard();
