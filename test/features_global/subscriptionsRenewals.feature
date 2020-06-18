Feature: Renewals
  As a customer
  I want to be able to renew existing journal subscriptions
  So that they will continue to be delivered to me

  @RenewalsE2E @renewals
  Scenario Outline: Successful renewal of journals
    Given I am an existing customer based in US
    And   I am on the renewals home page
    And   I have a <fullfiller> renewal ready to renew
    When  I accept the renewal
    Then  I am taken to the eCapture page
    And   The correct <fullfiller> renewal details are displayed
    And   I am making a payment using a mastercard
    Then  eCapture succeeds
    When  I login into ORR
    Then  The order is displayed in ORR
    Examples:
      | fullfiller  |
      | Delta       |
      | ARGI        |
      | AirBusiness |

  @RenewalsE2Emob @renewals
  Scenario Outline: The renewal process can connect to eCapture
    Given I am an existing customer based in US
    And   I am on the renewals home page
    And   I have a <fullfiller> renewal ready to renew
    When  I accept the renewal
    Then  I am taken to the eCapture page
    And   The correct <fullfiller> renewal details are displayed
    Examples:
      | fullfiller  |
      | Delta       |
      | ARGI        |
      | AirBusiness |

  @wip
  Scenario: The CK renewal process can connect to eCapture
    Given I am an existing customer based in US
    And   I am on the CK home page
    And   I am not logged in to CK
    And   I have CK renewal ready to renew
    When  I accept the renewal
    Then  I am taken to the eCapture page
    And   The correct renewals details are displayed

  @wip
  Scenario: An ARGI journal can be renewed successfully
    Given I am on the renewals home page
    And   I have an ARGI renewal ready to renew
    When  I accept the renewal
    Then  I am taken to the eCapture page
    And   The correct renewals details are displayed

  @wip
  Scenario: A Delta journal can be renewed successfully
    Given I am on the renewals home page
    And   I have an Delta renewal ready to renew
    When  I accept the renewal
    Then  I am taken to the eCapture page
    And   The correct renewals details are displayed
