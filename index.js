let player1, playerCards, playerTotal, dealer, dealerTotal,  drawCard, newCards, cardValue, dealerCard1Value, faceCards, playerCard1Value, playerCard2Value, playerNewCardValue, iterations, dealerIterations, dealerNewCardValue
faceCards = {KING: 10, QUEEN: 10, JACK: 10, ACE: 11}
player1 = document.getElementById('player1')
playerCards = document.getElementById('playerCards')
playerTotal = document.getElementById('player-total')
dealer = document.getElementById('dealer')
playerNewCardValue = []
dealerNewCardValue = []
dealerTotal = 0
playerTotal = 0
iterations = 0
dealerIterations = 0


let request = async () => {
    let req = await fetch('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
    let res = await req.json()

        let draw1 = await fetch(`http://deckofcardsapi.com/api/deck/${res.deck_id}/draw/?count=1`)
        let drawCard = await draw1.json()
        
        dealerCard1Value = parseInt(drawCard.cards[0].value) ? parseInt(drawCard.cards[0].value) : faceCards[drawCard.cards[0].value]
        dealerTotal = dealerCard1Value
        console.log('dealertotal =', dealerTotal)

        let dealerCard1 = document.createElement('img')
        dealerCard1.setAttribute('src', drawCard.cards[0].image) 
        dealer.append(dealerCard1)
        
        let draw2 = await fetch(`http://deckofcardsapi.com/api/deck/${res.deck_id}/draw/?count=2`)
        let drawCards = await draw2.json()
        let playerCard1 = document.createElement('img')
        let playerCard2 = document.createElement('img')
        playerCard1.setAttribute('src', drawCards.cards[0].image)
        playerCard2.setAttribute('src',drawCards.cards[1].image)
        playerCard1Value = parseInt(drawCards.cards[0].value) ? parseInt(drawCards.cards[0].value) : faceCards[drawCards.cards[0].value]
        playerCard2Value = parseInt(drawCards.cards[1].value) ? parseInt(drawCards.cards[1].value) : faceCards[drawCards.cards[1].value]
        playerTotal = playerCard1Value + playerCard2Value
        console.log('player total = ', playerTotal)

        player1.append(playerCard1, playerCard2)
        
        let player1Hit = document.createElement('button')  
        player1Hit.innerText = "Hit Me"
        player1Hit.addEventListener('click', async () => {
                let draw1 = await fetch(`http://deckofcardsapi.com/api/deck/${res.deck_id}/draw/?count=1`)
                let drawCard = await draw1.json()
                let newCard = document.createElement('img')
                newCard.setAttribute('src', drawCard.cards[0].image)
                playerNewCardValue.push(drawCard.cards[0].value)
                playerCards.append(newCard)
                playerTotal = playerTotal + (parseInt(playerNewCardValue[iterations]) ? parseInt(playerNewCardValue[iterations]) : faceCards[playerNewCardValue[iterations]])
                ++iterations
              //  if (playerTotal > 21) {alert('you busted')}
            })
        let player1Stand = document.createElement('button')
        player1Stand.innerText = "Stand"
        player1Stand.addEventListener('click', async () => {
           while (dealerTotal < 17) {
            let dealerDraw = await fetch(`http://deckofcardsapi.com/api/deck/${res.deck_id}/draw/?count=1`)
            let dealerDrawCard = await dealerDraw.json()
            let newCardDealer = document.createElement('img')
            newCardDealer.setAttribute('src', dealerDrawCard.cards[0].image)
            dealerNewCardValue.push(dealerDrawCard.cards[0].value)
            dealer.append(newCardDealer)
            dealerTotal = dealerTotal + (parseInt(dealerNewCardValue[dealerIterations]) ? parseInt(dealerNewCardValue[dealerIterations]) : faceCards[dealerNewCardValue[dealerIterations]])
            ++dealerIterations
            console.log(dealerTotal)
           }
        })
            player1.append(player1Hit, player1Stand)
            
        }
        
        request()




     
