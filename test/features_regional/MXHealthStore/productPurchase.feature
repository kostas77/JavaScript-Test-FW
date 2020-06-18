Feature: product Purchase
  As a customer
  I want to be able to purchase products
  So that they will be delivered to me

  @full @HealthStores @AMHealthStores @MXHealthStore @vitalSourceEBookPurchase @email
  Scenario: Purchasing an ebook from the mexico store
    Given I am on the LATAM Store home page
    When  I add the following product types in the cart:
      | Product Type         |
      | VST EBook            |
    And   I proceed to the checkout page
    And   I click on the register button
    And   I register
    And   I place the order with eCapture
    Then  The order is displayed in the thank you page
    When  I login into ORR
    Then  The order is displayed in ORR
    And   The order is valid in ORR
    And   ORR has routed or sent the order for fulfillment
    And   I receive an Elsevier new order confirmation email
    And   I receive an vital source email
