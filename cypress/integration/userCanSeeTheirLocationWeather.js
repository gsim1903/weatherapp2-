describe('weather info for a users lcoation', () => {
    cy.visit('/', ({
        onBeforeload(window) {
          const stubLocation = {
            coords: { 
                latitiude: 57.7308, 
                longitute: 11.9834
             },
        }
        cy.stub(window.navigator.geolocation, "getCurrentPosition").callsFake(
            (callback) => {
              return callback(stubLocation)
            }
        )
        }
    }))
})
    