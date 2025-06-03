        document.addEventListener('DOMContentLoaded', () => {
            let deck = [];
            let dealerHand = [];
            let playerHand = [];
            let currentBet = 0;
            let coins = 100;
            let gameInProgress = false;
            
            const coinsDisplay = document.getElementById('coins');
            const resetBtn = document.getElementById('reset-btn');
            const bettingSection = document.getElementById('betting-section');
            const gameSection = document.getElementById('game-section');
            const dealBtn = document.getElementById('deal-btn');
            const dealerCardsDiv = document.getElementById('dealer-cards');
            const playerCardsDiv = document.getElementById('player-cards');
            const dealerScoreSpan = document.getElementById('dealer-score');
            const playerScoreSpan = document.getElementById('player-score');
            const hitBtn = document.getElementById('hit-btn');
            const standBtn = document.getElementById('stand-btn');
            const foldBtn = document.getElementById('fold-btn');
            const newRoundBtn = document.getElementById('new-round-btn');
            const currentBetSpan = document.getElementById('current-bet');
            const resultMessageDiv = document.getElementById('result-message');
            const chipElements = document.querySelectorAll('.chip');
            
            loadCoins();
            resetGame();
            
            resetBtn.addEventListener('click', resetCoins);
            dealBtn.addEventListener('click', dealCards);
            hitBtn.addEventListener('click', playerHit);
            standBtn.addEventListener('click', playerStand);
            foldBtn.addEventListener('click', playerFold);
            newRoundBtn.addEventListener('click', newRound);
            
            chipElements.forEach(chip => {
                chip.addEventListener('click', () => {
                    const amount = parseInt(chip.getAttribute('data-amount'));
                    if (coins >= amount) {
                        currentBet += amount;
                        coins -= amount;
                        saveCoins();
                        updateUI();
                        
                        chipElements.forEach(c => c.classList.remove('active'));
                        chip.classList.add('active');
                        setTimeout(() => chip.classList.remove('active'), 300);
                    }
                });
            });
            
            function loadCoins() {
                const savedCoins = localStorage.getItem('blackjackCoins');
                if (savedCoins !== null) {
                    coins = parseInt(savedCoins);
                    updateUI();
                }
            }
            
            function saveCoins() {
                localStorage.setItem('blackjackCoins', coins.toString());
                updateUI();
            }
            
            function resetCoins() {
                coins = 100;
                saveCoins();
                resetGame();
            }
            
            function resetGame() {
                currentBet = 0;
                gameInProgress = false;
                deck = createDeck();
                dealerHand = [];
                playerHand = [];
                
                dealerCardsDiv.innerHTML = '';
                playerCardsDiv.innerHTML = '';
                dealerScoreSpan.textContent = '';
                playerScoreSpan.textContent = '0';
                resultMessageDiv.textContent = '';
                resultMessageDiv.className = 'text-center text-xl font-bold mb-6';
                
                bettingSection.classList.remove('hidden');
                gameSection.classList.add('hidden');
                newRoundBtn.classList.add('hidden');
                
                hitBtn.disabled = false;
                standBtn.disabled = false;
                foldBtn.disabled = false;
                
                updateUI();
            }
            
            function newRound() {
                if (coins === 0) {
                    resetCoins();
                } else {
                    currentBet = 0;
                    gameInProgress = false;
                    deck = createDeck();
                    dealerHand = [];
                    playerHand = [];
                    
                    dealerCardsDiv.innerHTML = '';
                    playerCardsDiv.innerHTML = '';
                    dealerScoreSpan.textContent = '';
                    playerScoreSpan.textContent = '0';
                    resultMessageDiv.textContent = '';
                    resultMessageDiv.className = 'text-center text-xl font-bold mb-6';
                    
                    bettingSection.classList.remove('hidden');
                    gameSection.classList.add('hidden');
                    newRoundBtn.classList.add('hidden');
                    
                    hitBtn.disabled = false;
                    standBtn.disabled = false;
                    foldBtn.disabled = false;
                }
                
                updateUI();
            }
            
            function createDeck() {
                const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
                const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
                const deck = [];
                
                for (let suit of suits) {
                    for (let value of values) {
                        deck.push({
                            suit,
                            value,
                            image: `cards/${value}_of_${suit}.png`
                        });
                    }
                }
                
                for (let i = deck.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [deck[i], deck[j]] = [deck[j], deck[i]];
                }
                
                return deck;
            }
            
            function dealCards() {
                if (currentBet === 0) return;
                
                gameInProgress = true;
                bettingSection.classList.add('hidden');
                gameSection.classList.remove('hidden');
                
                playerHand = [drawCard(), drawCard()];
                dealerHand = [drawCard(), drawCard()];
                
                displayCards();
                
                const playerScore = calculateScore(playerHand);
                const dealerScore = calculateScore(dealerHand);
                
                if (playerScore === 21) {
                    if (dealerScore === 21) {
                        endGame("Push! Both have Blackjack", 0);
                    } else {
                        endGame("Blackjack! You win!", currentBet * 2.5);
                    }
                    showDealerCards();
                } else {
                    updateUI();
                }
            }
            
            function drawCard() {
                return deck.pop();
            }
            
            function displayCards() {
                dealerCardsDiv.innerHTML = '';
                playerCardsDiv.innerHTML = '';
                
                createCard(dealerHand[0].image, dealerCardsDiv);
                createCard('cards/back.png', dealerCardsDiv).classList.add('hidden-card');
                
                playerHand.forEach(card => {
                    createCard(card.image, playerCardsDiv);
                });
                
                playerScoreSpan.textContent = calculateScore(playerHand);
            }
            
            function createCard(image, parent) {
                const cardDiv = document.createElement('div');
                cardDiv.className = 'card';
                cardDiv.style.backgroundImage = `url('${image}')`;
                parent.appendChild(cardDiv);
                return cardDiv;
            }
            
            function playerHit() {
                if (!gameInProgress) return;
                
                playerHand.push(drawCard());
                displayCards();
                
                const playerScore = calculateScore(playerHand);
                if (playerScore > 21) {
                    endGame("Bust! You lose!", 0);
                    showDealerCards();
                }
            }
            
            function playerStand() {
                if (!gameInProgress) return;
                
                showDealerCards();
                dealerPlay();
            }
            
            function playerFold() {
                if (!gameInProgress) return;
                
                endGame("You folded", currentBet / 2);
                showDealerCards();
            }
            
            function showDealerCards() {
                dealerCardsDiv.innerHTML = '';
                dealerHand.forEach(card => {
                    createCard(card.image, dealerCardsDiv);
                });
                dealerScoreSpan.textContent = calculateScore(dealerHand);
            }
            
            function dealerPlay() {
                let dealerScore = calculateScore(dealerHand);
                
                while (dealerScore < 17) {
                    dealerHand.push(drawCard());
                    dealerScore = calculateScore(dealerHand);
                }
                
                showDealerCards();
                determineWinner();
            }
            
            function determineWinner() {
                const playerScore = calculateScore(playerHand);
                const dealerScore = calculateScore(dealerHand);
                
                if (dealerScore > 21) {
                    endGame("Dealer bust! You win!", currentBet * 2);
                } else if (playerScore > dealerScore) {
                    endGame("You win!", currentBet * 2);
                } else if (playerScore < dealerScore) {
                    endGame("You lose!", 0);
                } else {
                    endGame("Push! It's a tie", currentBet);
                }
            }
            
            function endGame(message, winnings) {
                gameInProgress = false;
                resultMessageDiv.textContent = message;
                resultMessageDiv.classList.add('result-message');
                
                hitBtn.disabled = true;
                standBtn.disabled = true;
                foldBtn.disabled = true;
                
                if (winnings > currentBet) {
                    resultMessageDiv.classList.add('text-green-500');
                } else if (winnings === currentBet) {
                    resultMessageDiv.classList.add('text-indigo-500');
                } else {
                    resultMessageDiv.classList.add('text-red-500');
                }
                
                coins += winnings;
                saveCoins();
                
                newRoundBtn.classList.remove('hidden');
                newRoundBtn.classList.add('pulse');
            }
            
            function calculateScore(hand) {
                let score = 0;
                let aces = 0;
                
                for (let card of hand) {
                    if (card.value === 'ace') {
                        aces++;
                        score += 11;
                    } else if (['king', 'queen', 'jack'].includes(card.value)) {
                        score += 10;
                    } else {
                        score += parseInt(card.value);
                    }
                }
                
                while (score > 21 && aces > 0) {
                    score -= 10;
                    aces--;
                }
                
                return score;
            }
            
            function updateUI() {
                coinsDisplay.textContent = `✧${coins}`;
                currentBetSpan.textContent = currentBet;
                
                chipElements.forEach(chip => {
                    const amount = parseInt(chip.getAttribute('data-amount'));
                    if (coins < amount) {
                        chip.classList.add('opacity-50', 'cursor-not-allowed');
                    } else {
                        chip.classList.remove('opacity-50', 'cursor-not-allowed');
                    }
                });
                
                if (currentBet === 0) {
                    dealBtn.classList.add('opacity-50', 'cursor-not-allowed');
                } else {
                    dealBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                }
            }
        });