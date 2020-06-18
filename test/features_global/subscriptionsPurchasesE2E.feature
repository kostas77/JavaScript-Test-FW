Feature: Subscription products purchase
  As an Elsevier customer
  I want to be able to purchase ClinicalKey, Embase and Amirsys subscription products

  @SubsE2E @CKSubsE2E @SubCancel @email
  Scenario Outline: Single ClinicalKey products can be purchased in US
    Given I am an existing customer based in <country>
    And   I have no existing subscriptions
    And   I am on the CK home page
    And   I am not logged in to CK
    When  I add a <product> - <duration> to my cart
    And   I set the term to <duration> for <product>
    Then  I should have <title> with an sbn of <sbn> in my cart
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I continue to pay using a <credit card>
    Then  eCapture is successful
    And   The order is displayed in CK Order History
    When  I login into ORR
    And   I cancel the subscription in ORR
    Then  The order is displayed in ORR
    And   I receive a CK order confirmation email
  # And   The CK order confirmation email contains the correct order and customer details
    Examples:
      | country | product             | duration            | title                                     | sbn   | credit card |
      | US      | family-medicine     | 1 Year Subscription | Family Medicine - 1 Year Subscription     | CKCOM | visa        |
      | US      | emergency-medicine  | 30 Day Subscription | Emergency Medicine - 30 Day Subscription  | CKCOM | mastercard  |

  @DailyE2E @CKSubsE2E @SubCancel @email
  Scenario Outline: Single ClinicalKey products can be purchased from customers via the guest checkout in different countries, using different payment methods
    Given I am based in <country>
    And   I have no existing subscriptions
    And   I am on the CK home page
    And   I am not logged in to CK
    When  I add a <product> - <duration> to my cart
    And   I set the term to <duration> for <product>
    Then  I should have <title> with an sbn of <sbn> in my cart
    And   I proceed to the checkout page
    And   I enter my shipping and billing address details
    And   I continue to pay using a <credit card>
    Then  eCapture is successful
  # And   The order is displayed in CK Order History
    When  I login into ORR
    And   I cancel the subscription in ORR
    Then  The order is displayed in ORR
    And   I receive a CK order confirmation email
  # And   The CK order confirmation email contains the correct order and customer details
    Examples:
      | country | product           | duration             | title                                   | sbn   | credit card |
      | GB      | internal-medicine | 1 Year Subscription  | Internal Medicine - 1 Year Subscription | CKCOM | amex        |
      | JP      | pediatrics        | 30 Day Subscription  | Pediatrics - 30 Day Subscription        | CKCOM | visa        |
      | DE      | dermatology       | 1 Year Subscription  | Dermatology - 1 Year Subscription       | CKCOM | mastercard  |

  @SubsE2Emob @CKSubsE2Emob @SubCancel @email
  Scenario Outline: Single ClinicalKey products can be purchased in US
    Given I am an existing customer based in US
    And   I have no existing subscriptions
    And   I am on the CK home page
    And   I am not logged in to CK
    When  I add a <product> - <duration> to my cart
    And   I set the term to <duration> for <product>
    Then  I should have <title> with an sbn of <sbn> in my cart
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I continue to pay using a <credit card>
    Then  eCapture is successful
    And   The order is displayed in CK Order History
    When  I login into ORR
    And   I cancel the subscription in ORR
    Then  The order is displayed in ORR
    Examples:
      | product         | duration            | title                                 | sbn   | credit card |
      | family-medicine | 1 Year Subscription | Family Medicine - 1 Year Subscription | CKCOM | amex        |

  @SubsE2E @EmbaseSubsE2E @SubCancel
  Scenario Outline: Different types of Embase subscriptions can be purchased
    Given I am an existing customer based in US
    And   I am on the Embase home page
    When  I add a <product> - <duration> to my cart
  # And   I set the term to correct <duration> in the cart
    Then  I should have <title> with an sbn of <sbn> in my cart
    When  I proceed to the checkout page
    And   I login on the checkout page
    And   I continue to pay using a <credit card>
    Then  eCapture is successful
    And   The order is displayed in Elsevier Order History
    When  I login into ORR
    And   I cancel the subscription in ORR
    Then  The order is displayed in ORR
  # And   I receive an order confirmation email
  # And   The Embase order confirmation email contains the correct order and customer details
    Examples:
      | product | duration            | title            | sbn       | credit card |
      | Embase  | 7 Day Subscription  | Embase eCommerce | EMBASECOM | amex        |
      | Embase  | 30 Day Subscription | Embase eCommerce | EMBASECOM | mastercard  |

  @wip @SubsE2Emob @EmbaseSubsE2Emob @SubCancel
  Scenario Outline: Different types of Embase subscriptions can be purchased on mobile devices
    Given I am an existing customer based in US
    And   I am on the Embase home page
    When  I add a <product> - <duration> to my cart
  # And   I set the term to correct <duration> in the cart
    Then  I should have <title> with an sbn of <sbn> in my cart
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I continue to pay using a <credit card>
    Then  eCapture is successful
    And   The order is displayed in Elsevier Order History
    When  I login into ORR
    And   I cancel the subscription in ORR
    Examples:
      | product | duration            | title            | sbn       | credit card |
      | Embase  | 7 Day Subscription  | Embase eCommerce | EMBASECOM | mastercard  |

  @SubsE2E @AmirsysSubsE2E @SubCancel @email
  Scenario Outline: Different types of Amirsys subscriptions can be purchased
    Given I am an existing customer based in US
    And   I have no existing subscriptions
    And   I am not logged in to Amirsys
    And   I am on the Amirsys <product> home page
    When  I add a product with sku <skucode> to my cart
    Then  I should have <title> with an sbn of <sbn> in my cart
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I continue to pay using a <credit card>
    Then  eCapture is successful
    And   The order is displayed in Amirsys Order History
    When  I login into ORR
    And   I cancel the subscription in ORR
    Then  The order is displayed in ORR
  # And   I receive a Amirsys order confirmation email
  # And   The Amirsys order confirmation email contains the correct order and customer details
    Examples:
      | product     | title                               | skucode       | sbn              | credit card |
      | RADPrimer   | RADPrimer Individual Subscription   | AMRRDPRINDSUB | AMSAPPID-RADPRM  | amex        |

  @DailyE2E @AmirsysSubsE2E @SubCancel @email
  Scenario Outline: Different types of Amirsys subscriptions can be purchased on mobile devices
    Given I am an existing customer based in US
    And   I have no existing subscriptions
    And   I am not logged in to Amirsys
    And   I am on the Amirsys <product> home page
    When  I add a product with sku <skucode> to my cart
    Then  I should have <title> with an sbn of <sbn> in my cart
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I continue to pay using a <credit card>
    Then  eCapture is successful
    And   The order is displayed in Amirsys Order History
    When  I login into ORR
    And   I cancel the subscription in ORR
    Then  The order is displayed in ORR
  # And   I receive a Amirsys order confirmation email
  # And   The Amirsys order confirmation email contains the correct order and customer details
    Examples:
      | product     | title                               | skucode       | sbn              | credit card |
      | ExpertPath  | ExpertPath Individual Subscription  | AMRXPTHINDSUB | AMSAPPID-EXPATH  | amex        |
      | ImmunoQuery | ImmunoQuery Individual Subscription | AMRIMMQINDSUB | AMSAPPID-IMUQRY  | mastercard  |
      | PATHPrimer  | PATHPrimer Individual Subscription  | AMRPTPRINDSUB | AMSAPPID-PATHPRM | visa        |
      | STATdx      | STATdx Individual Subscription      | AMRSTATINDSUB | AMSAPPID-STATDX  | visa        |

  @wip @SubsE2Emob @AmirsysSubsE2Emob @SubCancel @email
  Scenario Outline: Different Amirsys subscriptions can be purchased on mobile devices
    Given I am an existing customer based in US
    And   I have no existing subscriptions
    And   I am not logged in to Amirsys
    And   I am on the Amirsys <product> home page
    When  I add a product with sku <skucode> to my cart
    Then  I should have <title> with an sbn of <sbn> in my cart
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I continue to pay using a <credit card>
    Then  eCapture is successful
    And   The order is displayed in Amirsys Order History
    When  I login into ORR
    And   I cancel the subscription in ORR
    Then  The order is displayed in ORR
  # And   I receive a Amirsys order confirmation email
  # And   The Amirsys order confirmation email contains the correct order and customer details
    Examples:
      | product     | title                               | skucode       | sbn              | credit card |
      | STATdx      | STATdx Individual Subscription      | AMRSTATINDSUB | AMSAPPID-STATDX  | visa        |

# -------------------------Production E2E Tests---------------------------

  @PROD @SubsPROD @CKSubsPROD
  Scenario Outline: Single ClinicalKey products purchase process can connect to eCapture
    Given I am an existing customer based in US
    And   I am on the CK home page
    And   I am not logged in to CK
    When  I add a <product> - <duration> to my cart
    And   I set the term to <duration> for <product>
    Then  I should have <title> with an sbn of <sbn> in my cart
    When  I proceed to the checkout page
    And   I login on the checkout page
    Then  eCapture is accessible
    Examples:
      | product             | duration            | title                                     | sbn   |
      | family-medicine     | 1 Year Subscription | Family Medicine - 1 Year Subscription     | CKCOM |
      | emergency-medicine  | 30 Day Subscription | Emergency Medicine - 30 Day Subscription  | CKCOM |

  @PROD @SubsPROD @EmbaseSubsPROD
  Scenario Outline: Single Embase subscriptions purchase process can connect to eCapture
    Given I am an existing customer based in US
    And   I am on the Embase home page
    When  I add a <product> - <duration> to my cart
    Then  I should have <title> with an sbn of <sbn> in my cart
    When  I proceed to the checkout page
    And   I login on the checkout page
    Then  eCapture is accessible
    Examples:
      | product | duration            | title            | sbn       |
      | Embase  | 30 Day Subscription | Embase eCommerce | EMBASECOM |
      | Embase  | 7 Day Subscription  | Embase eCommerce | EMBASECOM |

  @PROD @SubsPROD @AmirsysSubsPROD
  Scenario Outline: Single Amirsys products purchase process can connect to eCapture
    Given I am an existing customer based in US
    And   I am not logged in to Amirsys
    And   I am on the Amirsys <product> home page
    When  I add a product with sku <skucode> to my cart
    Then  I should have <title> with an sbn of <sbn> in my cart
    When  I proceed to the checkout page
    And   I login on the checkout page
    Then  eCapture is accessible
    Examples:
      | product     | title                               | skucode       | sbn              |
      | PATHPrimer  | PATHPrimer Individual Subscription  | AMRPTPRINDSUB | AMSAPPID-PATHPRM |
