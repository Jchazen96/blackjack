let player1, playerCards, playerTotal, dealer, dealerTotal,  drawCard, newCards, cardValue, dealerCard1Value, playerFaceCards, dealerFaceCards, playerCard1Value, playerCard2Value, playerNewCardValue, iterations, dealerIterations, dealerNewCardValue, fullPlayerCards, fullDealerCards, playerSum, dealerSum, bankroll, bank, bet
playerFaceCards = {KING: 10, QUEEN: 10, JACK: 10, ACE: 11}
dealerFaceCards = {KING: 10, QUEEN: 10, JACK: 10, ACE: 11}
player1 = document.getElementById('player1')
playerCards = document.getElementById('playerCards')
playerSum = document.getElementById('player-total')
dealerSum = document.getElementById('dealer-total')
dealer = document.getElementById('dealer')
playAgain = document.getElementById('play-again')
betForm = document.getElementById('bettingForm')
bank = document.getElementById('bankroll')
bet = document.getElementById('bet') 
playerNewCardValue = []
fullPlayerCards = []
dealerNewCardValue = []
fullDealerCards = []
dealerTotal = 0
playerTotal = 0
iterations = 0
dealerIterations = 0
bankroll = 500
bet.value = 0


let request = async () => {
    let req = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
    let res = await req.json()

        let draw1 = await fetch(`https://deckofcardsapi.com/api/deck/${res.deck_id}/draw/?count=1`)
        let drawCard = await draw1.json()
        
        dealerCard1Value = parseInt(drawCard.cards[0].value) ? parseInt(drawCard.cards[0].value) : dealerFaceCards[drawCard.cards[0].value]
        dealerTotal = dealerCard1Value
        fullDealerCards.push(dealerCard1Value)


        let dealerCard1 = document.createElement('img')
        dealerCard1.setAttribute('src', drawCard.cards[0].image) 
        dealer.append(dealerCard1)
        dealerSum.innerText = ""
        dealerSum.append('Dealer Total : ', dealerTotal)

        let draw2 = await fetch(`https://deckofcardsapi.com/api/deck/${res.deck_id}/draw/?count=2`)
        let drawCards = await draw2.json()
        let playerCard1 = document.createElement('img')
        let playerCard2 = document.createElement('img')
        playerCard1.setAttribute('src', drawCards.cards[0].image)
        playerCard2.setAttribute('src',drawCards.cards[1].image)
        playerCard1Value = parseInt(drawCards.cards[0].value) ? parseInt(drawCards.cards[0].value) : playerFaceCards[drawCards.cards[0].value]
        playerCard2Value = parseInt(drawCards.cards[1].value) ? parseInt(drawCards.cards[1].value) : playerFaceCards[drawCards.cards[1].value]
        playerTotal = playerCard1Value + playerCard2Value
        fullPlayerCards.push(playerCard1Value, playerCard2Value)
        playerSum.innerText = ""
        playerSum.append('Player Total : ', playerTotal)
        bank.innerText = `Bankroll : ${bankroll}`
        if (playerTotal === 21) {
            setTimeout(() => {alert('BLACKJACK!')}, 300)
            bankroll = parseInt(bankroll) + ((parseInt(bet.value)*2.5))
            bank.innerText = `Bankroll : ${bankroll}`

        }

        player1.append(playerCard1, playerCard2)
        let player1Hit = document.createElement('button')  
        player1Hit.innerText = "Hit Me"
        player1Hit.addEventListener('click', async () => {
            let draw1 = await fetch(`https://deckofcardsapi.com/api/deck/${res.deck_id}/draw/?count=1`)
            let drawCard = await draw1.json()
            let newCard = document.createElement('img')
            newCard.setAttribute('src', drawCard.cards[0].image)
            playerNewCardValue.push(drawCard.cards[0].value)
            playerCards.append(newCard)
            playerTotal = playerTotal + (parseInt(playerNewCardValue[iterations]) ? parseInt(playerNewCardValue[iterations]) : playerFaceCards[playerNewCardValue[iterations]])
            fullPlayerCards.push((parseInt(playerNewCardValue[iterations]) ? parseInt(playerNewCardValue[iterations]) : playerFaceCards[playerNewCardValue[iterations]]))
            ++iterations
            for(i=0; i<fullPlayerCards.length; i++) {
                if (fullPlayerCards[i] === 11 && playerTotal > 21) {
                    playerTotal -= 10
                    const index = fullPlayerCards.findIndex(element => element === 11)
                    const result = fullPlayerCards.splice(index, 1)
                   
                }
            }
            playerSum.innerText = ""
            playerSum.append('Player Total : ', playerTotal)
              if (playerTotal > 21) {
                setTimeout(() => {alert('you busted')}, 500)
                bank.innerText = ""
                bankroll = bankroll - bet.value
                bank.innerText = `Bankroll : ${bankroll}`
                player1Hit.disabled = true
                player1Stand.disabled = true
            }
            })


        let player1Stand = document.createElement('button')
        player1Stand.innerText = "Stand"
        player1Stand.addEventListener('click', async () => {
           while (dealerTotal < 17) {
            let dealerDraw = await fetch(`https://deckofcardsapi.com/api/deck/${res.deck_id}/draw/?count=1`)
            let dealerDrawCard = await dealerDraw.json()
            let newCardDealer = document.createElement('img')
            newCardDealer.setAttribute('src', dealerDrawCard.cards[0].image)
            dealerNewCardValue.push(dealerDrawCard.cards[0].value)
            dealer.append(newCardDealer)
            dealerTotal = dealerTotal + (parseInt(dealerNewCardValue[dealerIterations]) ? parseInt(dealerNewCardValue[dealerIterations]) : dealerFaceCards[dealerNewCardValue[dealerIterations]])
            fullDealerCards.push((parseInt(dealerNewCardValue[dealerIterations]) ? parseInt(dealerNewCardValue[dealerIterations]) : dealerFaceCards[dealerNewCardValue[dealerIterations]]))
            ++dealerIterations
            for(i=0; i<fullDealerCards.length; i++) {
                if (fullDealerCards[i] === 11 && dealerTotal > 21) {
                    dealerTotal -= 10
                    const index = fullDealerCards.findIndex(element => element === 11)
                    const result = fullDealerCards.splice(index, 1)
                }
            }
            dealerSum.innerText = ""
            dealerSum.append('Dealer Total : ', dealerTotal)
            
        }


        if (dealerTotal > 21) {
            setTimeout(() => {alert('Congratulations, you won!')}, 300)
            bank.innerText = ""
            bankroll = parseInt(bankroll) + parseInt(bet.value)
            bank.innerText = `Bankroll : ${bankroll}`
            player1Stand.disabled = true
            player1Hit.disabled = true
        }
          else if (dealerTotal === playerTotal) {
            setTimeout(() => {alert(`It's a tie!`)}, 300)
            player1Stand.disabled = true
            player1Hit.disabled = true
        } else if (dealerTotal > playerTotal) {
            setTimeout(() => {alert(`You lose!`)}, 300)
            bank.innerText = ""
            bankroll = bankroll - bet.value
            bank.innerText = `Bankroll : ${bankroll}`
            player1Stand.disabled = true
            player1Hit.disabled = true
        } else if (playerTotal > dealerTotal) {
            setTimeout(() => {alert(`Congratulations, you won!`)}, 300)
            bank.innerText = ""
            bankroll = parseInt(bankroll) + parseInt(bet.value)
            bank.innerHTML = `Bankroll : ${bankroll}`
            player1Stand.disabled = true
            player1Hit.disabled = true
        }
        })
            player1.append(player1Hit, player1Stand)
            
        }
        
        request()


playAgain.addEventListener('click', () => {
    playerNewCardValue = []
    fullPlayerCards = []
    dealerNewCardValue = []
    fullDealerCards = []
    dealerTotal = 0
    playerTotal = 0
    iterations = 0
    dealerIterations = 0
    bank.innerText = ""
    bank.innerText = `Bankroll : ${bankroll}`
    player1.innerText = ""
    playerCards.innerText = ""
    dealer.innerText = ""
request()

})

     
