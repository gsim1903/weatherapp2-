describe("weather info for user`s location", () => {
  beforeEach(() => {
    cy.intercept("https://api.openweathermap.org/data/2.5/**", {
      fixture: "weather.json",
    });
    cy.intercept("https://api.opencagedata.com/geocode/v1/json**", {
      fixture: "location.json",
    });
  });
  it("is expected to be displayed on initial render", () => {
    cy.visit("/", {
      onBeforeLoad(window) {
        const stubLocation = {
          coords: {
            latitude: 59.46081,
            longitude: 17.88477,
          },
        };
        cy.stub(window.navigator.geolocation, "getCurrentPosition").callsFake(
          (callback) => {
            return callback(stubLocation);
          }
        );
      },
    });
    cy.get("[data-cy=weather-display]").within(() => {
      cy.get("[data-cy=temp]").should("contain", "5.53°C");
      cy.get("[data-cy=city]").should("contain", "Edinburgh");
    });
  });
});