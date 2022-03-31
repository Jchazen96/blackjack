let player1, playerCards, playerTotal, dealer, dealerTotal,  drawCard, newCards, cardValue, dealerCard1Value, faceCards, playerCard1Value, playerCard2Value
faceCards = {KING: 10, QUEEN: 10, JACK: 10, ACE: 11}
player1 = document.getElementById('player1')
playerCards = document.getElementById('playerCards')
playerTotal = document.getElementById('player-total')
dealer = document.getElementById('dealer')
newCards = []
dealerTotal = 0
playerTotal = 0


let request = async () => {
    let req = await fetch('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
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
        console.log('player total = ', playerCard1Value + playerCard2Value)

        player1.append(playerCard1, playerCard2)
        
        let player1btn = document.createElement('button')  
       player1btn.innerText = "Hit Me"
        player1btn.addEventListener('click', async () => {
                let draw1 = await fetch(`http://deckofcardsapi.com/api/deck/${res.deck_id}/draw/?count=1`)
                let drawCard = await draw1.json()
                let newCard = document.createElement('img')
                newCard.setAttribute('src', drawCard.cards[0].image)
                newCards.push(drawCard.cards[0].value)
                playerCards.append(newCard)
            })
           player1.append(player1btn)

        }
        
        request()




     
