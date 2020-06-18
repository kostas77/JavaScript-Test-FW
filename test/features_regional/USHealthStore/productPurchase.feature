Feature: product Purchase
  As a customer
  I want to be able to purchase products (printbook, ebook, journal,...)
  So that they will be delivered to me

  @full @HealthStores @AMHealthStores @USHealthStore @multiProductPurchase @email
  Scenario: Multiple products can be purchased using the existing account checkout path
    Given I am on the US health Store home page
    And   I am an existing customer
    When  I add the following product types in the cart:
      | Product Type         |
      | Printbook            |
      | VST EBook            |
      | Delta journal        |
      | Argi journal         |
      | set of flash cards   |
      | DVD                  |
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I place the order with eCapture
    Then  The order is displayed in the thank you page
    When  I login into ORR
    Then  The order is displayed in ORR
    And   The order is valid in ORR
    And   ORR has routed or sent the order for fulfillment
    And   I receive an vital source email
    And   I receive an Elsevier new order confirmation email
