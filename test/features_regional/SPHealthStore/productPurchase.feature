Feature: product Purchase
  As a customer
  I want to be able to purchase products
  So that they will be delivered to me

  @full @HealthStores @EUHealthStores @SPHealthStore @multiProductPurchase @email
  Scenario: Multiple products can be purchased using the existing account checkout path
    Given I am on the Spain health Store home page
    And   I am an existing customer
    When  I add the following product types in the cart:
      | Product Type         |
      | Printbook            |
      | Journal              |
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I place the order with GlobalCollect
    Then  The order is displayed in the thank you page
    When  I login into ORR
    Then  The order is displayed in ORR
    And   The order is valid in ORR
    And   ORR has routed or sent the order for fulfillment
    And   I receive an Elsevier new order confirmation email

  @full @HealthStores @EUHealthStores @SPHealthStore @vitalSourceEBookPurchase @email
  Scenario: A single vital source book can be purchased
    Given I am on the Spain health Store home page
    And   I am an existing customer
    When  I add the following product types in the cart:
      | Product Type         |
      | VST EBook            |
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
