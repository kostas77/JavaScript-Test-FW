Feature: Cart Promotions functionality tests
  As an Elsevier customer
  I want to be able to apply promotions

  @PromotionFunctionalityE2E
  Scenario Outline: Cart discount is applied successfully for different products
    Given I add a <product> to the cart
    And   The <product> appears in the cart
    And   I increase the quantity of <product> in the cart
    When  I apply the <promo> cart discount code
    Then  The cart price is updated correctly for <product>
    Examples:
      | product    | promo |
      | Print book | E2E   |
