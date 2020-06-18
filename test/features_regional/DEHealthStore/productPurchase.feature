Feature: product Purchase
  As a customer
  I want to be able to purchase products
  So that they will be delivered to me

  @full @HealthStores @EUHealthStores @DEHealthStore @vitalSourceEBookPurchase @ecapturePurchase @email
  Scenario: Purchasing an ebook from the german store
    Given I am on the German Store home page
    And   I am an existing customer
    When  I add the following product types in the cart:
      | Product Type         |
      | VST EBook            |
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I place the order with eCapture Germany
    Then  The order is displayed in the thank you page
  # And   I login into ORR
  # And   The order is displayed in ORR
  # And   The order is valid in ORR
  # And   ORR has routed or sent the order for fulfillment
  # And   I receive an Elsevier new order confirmation email
    And   I receive an vital source email

  @full @HealthStores @EUHealthStores @DEHealthStore @printbookPurchase @flashcardPurchase @paypalPurchase @email
  Scenario: Purchasing multiple products from the german store with paypal
    Given I am on the German Store home page
    And   I am an existing customer
    When  I add the following product types in the cart:
      | Product Type         |
      | Printbook            |
      | set of flash cards   |
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I place the order with PayPal DE
    Then  The order is displayed in the thank you page
  # And   I login into ORR
  # And   The order is displayed in ORR
  # And   The order is valid in ORR
  # And   ORR has routed or sent the order for fulfillment
    And   I receive an Elsevier new order confirmation email

  @full @HealthStores @EUHealthStores @DEHealthStore @looseleafPurchase @otherPurchase @directDebitPurchase @email
  Scenario: Purchasing multiple item types from the german store with direct debit
    Given I am on the German Store home page
    And I am an existing customer
    When I add the following product types in the cart:
      | Product Type         |
      | Loose-leaf           |
      | Other                |
    And I proceed to the checkout page
    And I login on the checkout page
    And I place the order with Direct Debit
    Then The order is displayed in the thank you page
#    And I login into ORR
#    And The order is displayed in ORR
#    And The order is valid in ORR
#    And ORR has routed or sent the order for fulfillment
    And I receive an Elsevier new order confirmation email

  @full @HealthStores @EUHealthStores @DEHealthStore @posterPurchase @pinPurchase @invoicePurchase @dvdPurchase @email
  Scenario: Purchasing multiple item types from the german store with an invoice
    Given I am on the German Store home page
    And I am an existing customer
    When I add the following product types in the cart:
      | Product Type         |
      | Poster               |
      | PIN                  |
      | DVD                  |
    And I proceed to the checkout page
    And I login on the checkout page
    And I place the order with Bank check
    Then The order is displayed in the thank you page
#    And I login into ORR
#    And The order is displayed in ORR
#    And The order is valid in ORR
#    And ORR has routed or sent the order for fulfillment
    And I receive an Elsevier new order confirmation email

  @full @HealthStores @EUHealthStores @DEHealthStore @cdPurchase @prepaymentPurchase
  Scenario: Purchasing multiple item types from the german store with a pre-payment
    Given I am on the German Store home page
    And I am an existing customer
    When I add the following product types in the cart:
      | Product Type         |
      | CD                   |
    And I proceed to the checkout page
    And I login on the checkout page
    And I place the order with Proforma Invoice
    Then The order is displayed in the thank you page
#    And I login into ORR
#    And The order is displayed in ORR
#    And The order is valid in ORR
#    And ORR has routed or sent the order for fulfillment

@full @HealthStores @EUHealthStores @DEHealthStore @multiProductPurchase @globalCollectPurchase
  Scenario: Purchasing multiple products from the german store with Global Collect
    Given I am on the German Store home page
    And   I am an existing customer
    When  I add the following product types in the cart:
      | Product Type         |
      | Printbook            |
      | set of flash cards   |
      | Loose-leaf           |
      | Other                |
      | Poster               |
      | PIN                  |
      | DVD                  |
      | CD                   |
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I place the order with GlobalCollect
    Then  The order is displayed in the thank you page
  # And   I login into ORR
  # And   The order is displayed in ORR
  # And   The order is valid in ORR
  # And   ORR has routed or sent the order for fulfillment
