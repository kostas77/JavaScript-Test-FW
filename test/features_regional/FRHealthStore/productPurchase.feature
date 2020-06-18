Feature: product Purchase
  As a customer
  I want to be able to purchase products
  So that they will be delivered to me

  @full @HealthStores @EUHealthStores @FRHealthStore @electronicPayment @vitalSourceEBookPurchase @email
  Scenario: Purchasing an ebook from the french store
    Given I am on the French Store home page
    And   I am an existing customer
    When  I add the following product types in the cart:
      | Product Type         |
      | VST EBook            |
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I place the order with eCapture France
    Then  The order is displayed in the thank you page
    When  I login into ORR
    Then  The order is displayed in ORR
    And   The order is valid in ORR
    And   ORR has routed or sent the order for fulfillment
    And   I receive an Elsevier new order confirmation email
    And   I receive an vital source email

  @full @HealthStores @EUHealthStores @FRHealthStore @electronicPayment @multiProductPurchase @paypalPurchase @email
  Scenario: Purchasing a journal and a printbook from the french store with paypal
    Given I am on the French Store home page
    And   I am an existing customer
    When  I add the following product types in the cart:
      | Product Type         |
      | Printbook            |
      | Journal              |
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I place the order with PayPal
    Then  The order is displayed in the thank you page
    When  I login into ORR
    Then  The order is displayed in ORR
    And   The order is valid in ORR
    And   ORR has routed or sent the order for fulfillment
    And   I receive an Elsevier new order confirmation email

  @full @HealthStores @EUHealthStores @FRHealthStore @physicalPayment @printbookPurchase @bankCheckPurchase @email
  Scenario: Purchasing a printbook from the french store paid with a bank check
    Given I am on the French Store home page
    And   I am an existing customer
    When  I add the following product types in the cart:
      | Product Type         |
      | Printbook            |
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I place the order with Bank check
    Then  The order is displayed in the thank you page
    When  I login into ORR
    Then  The order is displayed in ORR
    And   The order is valid in ORR
    And   ORR has routed or sent the order for fulfillment
    And   I receive an Elsevier new order confirmation email

  @full @HealthStores @EUHealthStores @FRHealthStore @electronicPayment @printbookPurchase @CICPurchase @email
  Scenario: Purchasing a printbook from the french store paid with a CIC visa debit card
    Given I am on the French Store home page
    And   I am an existing customer
    When  I add the following product types in the cart:
      | Product Type         |
      | Printbook            |
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I place the order with CIC
    Then  The order is displayed in the thank you page
    When  I login into ORR
    Then  The order is displayed in ORR
    And   The order is valid in ORR
    And   ORR has routed or sent the order for fulfillment
    And   I receive an Elsevier new order confirmation email

  @full @HealthStores @EUHealthStores @FRHealthStore @physicalPayment @printbookPurchase @proformaInvoicePurchase @email
  Scenario: Purchasing a printbook from the french store paid with a Proforma Invoice
    Given I am on the French Store home page
    And   I am an existing customer
    When  I add the following product types in the cart:
      | Product Type         |
      | Printbook            |
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I place the order with Proforma Invoice
    Then  The order is displayed in the thank you page
    When  I login into ORR
    Then  The order is displayed in ORR
    And   The order is valid in ORR
    And   ORR has routed or sent the order for fulfillment
    And   I receive an Elsevier new order confirmation email
