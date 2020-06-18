Feature: ORR Order Flow
  As an Elsevier customer
  I want ORR to be able to accept orders for all the available stores and all different product types and process them through to the correct fulfilment system endpoint, so that the order can be fulfilled successfully

  @ushealthstore @ushealthstore_fulltest @inkling @orrflow
  Scenario: A US store Inkling eBook order is submitted to ORR and fulfilled successfully
    Given An order for a US store Inkling eBook item is generated
#    Given An order for an Inkling eBook item from the US store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Inkling
    And   The order is fulfilled successfully with Delta

  @ushealthstore @ushealthstore_fulltest @printbook @orrflow
  Scenario: A US store Print Book order is submitted to ORR and fulfilled successfully
    Given An order for a Print Book item from the US store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @ushealthstore @ushealthstore_fulltest @flashcard @orrflow
  Scenario: A US store Flash Card order is submitted to ORR and fulfilled successfully
    Given An order for a Flash Card item from the US store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @ushealthstore @ushealthstore_fulltest @cdrom @orrflow
  Scenario: A US store CD-ROM order is submitted to ORR and fulfilled successfully
    Given An order for a CDROM item from the US store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @ushealthstore @ushealthstore_fulltest @deltajournal @orrflow
  Scenario: A US store Delta Journal order is submitted to ORR and fulfilled successfully
    Given An order for a Delta journal item from the US store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @evolvestore @printbook @orrflow
  Scenario: An Evolve Print Book order is submitted to ORR and fulfilled successfully
    Given An order for a Print Book item from the EVOLVE store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @evolvestore @ebook @orrflow
  Scenario: An Evolve eBook order is submitted to ORR and fulfilled successfully
    Given An order for a Evolve ebook item from the EVOLVE store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

#  @evolvestore @physicalprod @orrflow @wip

  @ckstore @ck @orrflow
  Scenario: A CK subscription order is submitted to ORR and fulfilled successfully
    Given An order for a CK subscription item is generated
#    Given An order for a CK subscription item from the CK store is generated
    When  The order is sent to ORR
    Then  Payment is taken in ORR for this order
    And   The order is fulfilled successfully with CK
    And   The order is fulfilled successfully with CRM

  @globalstore @deltajournal @orrflow
  Scenario: A Delta Journal order is submitted to ORR and fulfilled successfully
    Given An order for a journal item from the non-specific store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @globalstore @argijournal @orrflow
  Scenario: An ARGI Journal order is submitted to ORR and fulfilled successfully
    Given An order for a ARGI journal item from the non-specific store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is routed successfully to ARGI

  @globalstore @advantagejournal @orrflow
  Scenario: An Advantage journal order update is submitted to ORR, processed and updated successfully
    Given An order for a advantage journal item from the non-specific store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is routed successfully to Advantage
    When  An order update is sent to ORR
    Then  There exists an update event
    And   The status for the item in the order is updated

  @globalstore @argirerouting @orrflow
  Scenario: An Argi journal is rerouted to Advantage
#    Given An order for a Reroute ARGI journal item from the non-specific store is generated
    Given An order for an ArgiReroute Journal item is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is routed successfully to Advantage
    When  An order update is sent to ORR
    Then  There exists an update event
    And   The status for the item in the order is updated

  @globalstore @sdrmebook @orrflow @wip
  Scenario: An SDRM e-book order is submitted to ORR and fulfilled successfully
    Given An order for an SDRM ebook item is generated
    When  The order is sent to ORR
  # Then  a payment is taken in ORR for this order
  # And   The order is fulfilled successfully with SDRM

  @globalstore @vstebook @orrflow @wip
  Scenario: A Vitalsource eBook order is submitted to ORR and fulfilled successfully
    Given An order for a Vitalsource eBook item is generated
    When  The order is sent to ORR
  # Then  a payment is taken in ORR for this order
  # And   The order is fulfilled successfully with Delta

  @bookmasterbook @orrflow @wip
  Scenario: A Bookmaster Book order is submitted to ORR and fulfilled successfully
    Given An order for a Bookmaster Book item is generated
    When  The order is sent to ORR
  # Then  No payment is taken in ORR for this order
  # And   The order is fulfilled successfully with Bookmaster

  @globalstore @articlechoice @orrflow @wip
  Scenario: An ArticleChoice order is submitted to ORR and fulfilled successfully
    Given An order for an ArticleChoice item is generated
    When  The order is sent to ORR
  # Then  Payment is taken in ORR for this order
  # And   The order is fulfilled successfully with ArticleChoice

  @embase @orrflow @wip
  Scenario: An Embase order is submitted to ORR and fulfilled successfully
    Given An order for an Embase item is generated
    When  The order is sent to ORR
  # Then  a payment is taken in ORR for this order
  # And   The order is fulfilled successfully with Embase

  @geofacetsitem @orrflow @wip
  Scenario: A Geofacets order is submitted to ORR and fulfilled successfully
    Given An order for a Geofacets item is generated
    When  The order is sent to ORR
  # Then  Payment is taken in ORR for this order
  # And   The order is fulfilled successfully with Geofacets

  @spainstore @saleslogixbook @orrflow
  Scenario: A SalesLogix Book order is submitted to ORR and fulfilled successfully
#    Given An order for a SalesLogix book item from the Spain store is generated
    Given An order for a SalesLogix Book item is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with SalesLogix

  @spainstore @ebook @orrflow
  Scenario: A Spain store eBook order is submitted to ORR and fulfilled successfully
    Given An order for a ebook item from the Spain store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @latamstore @ebook @orrflow
  Scenario: A Mexico store eBook order is submitted to ORR and fulfilled successfully
    Given An order for a ebook item from the Mexico store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @amirsysstore @amirsys @orrflow
  Scenario: An Amirsys order is submitted to ORR and fulfilled successfully
    Given An order for a AMIRSYS item from the AMIRSYS store is generated
    When  The order is sent to ORR
    Then  Payment is taken in ORR for this order
    And   The order is fulfilled successfully with A&E
    And   The order is fulfilled successfully with CRM

  @b2bstore @ebook @orrflow
  Scenario: An B2B order is submitted to ORR and fulfilled successfully
#    Given An order for a ScienceDirect item from the B2B store is generated
    Given A B2B order for an ebook is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order confirmation email is sent to the customer
    And   The order is fulfilled successfully with GECS

#  @spainstore @item1 @orrflow @wip

#  @spainstore @item2 @orrflow @wip

#  @latamstore @item1 @orrflow @wip

#  @latamstore @item2 @orrflow @wip

#  @amirsysstore @amirsys @orrflow @wip

#  @sdstore @article @orrflow @wip

#  @usposstore @shipto @orrflow @wip

#  @usposstore @pickup @orrflow @wip

#  @mercurystore @item @orrflow @wip

  @PROD_orrflow @wip
  Scenario: Order details are displayed correctly in ORR for a successful order
    Given A known order has been placed successfully
    Then  The order is displayed in ORR

  @francestore @ebook @orrflow
  Scenario: A France store eBook order is submitted to ORR and fulfilled successfully
    Given An order for an eBook item from the france store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @francestore @printbook @orrflow
  Scenario: A France store Print Book order is submitted to ORR and fulfilled successfully
    Given An order for a French book item from the france store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is routed successfully to Delta_France

  @francestore @deltafrancejournal @orrflow
  Scenario: A France store order is submitted to ORR and fulfilled successfully
    Given An order from France Store for a journal item is generated
#    Given An order for a Delta journal item from the France store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is routed successfully to Delta_France

  @ukstore @printbook @orrflow
  Scenario: A UK store print book order is submitted to ORR and fulfilled successfully
    Given An order for a print book item from the UK store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @ukstore @ebook @orrflow
  Scenario: A UK store eBook order is submitted to ORR and fulfilled successfully
    Given An order for an eBook item from the UK store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @ukstore @journal @orrflow
  Scenario: A UK store journal order is submitted to ORR and fulfilled successfully
    Given An order for a journal item from the UK store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @ukstore @flashcards @orrflow
  Scenario: A UK store flash card order is submitted to ORR and fulfilled successfully
    Given An order for a flash card item from the UK store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @ukstore @online @orrflow
  Scenario: A UK store online order is submitted to ORR and fulfilled successfully
    Given An order for an online item from the UK store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @ukstore @CDROM @orrflow
  Scenario: A UK store CDROM order is submitted to ORR and fulfilled successfully
    Given An order for a CDROM item from the UK store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @ukstore @DVD @orrflow
  Scenario: A UK store DVD order is submitted to ORR and fulfilled successfully
    Given An order for a DVD item from the UK store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @ukstore @Poster @orrflow
  Scenario: A UK store poster order is submitted to ORR and fulfilled successfully
    Given An order for a poster item from the UK store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @ukstore @PIN @orrflow
  Scenario: A UK store PIN order is submitted to ORR and fulfilled successfully
    Given An order for a PIN item from the UK store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @eustore @printbook @orrflow
  Scenario: A EU store print book order is submitted to ORR and fulfilled successfully
    Given An order for a print book item from the EU store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @eustore @ebook @orrflow
  Scenario: A EU store eBook order is submitted to ORR and fulfilled successfully
    Given An order for an eBook item from the EU store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @eustore @journal @orrflow
  Scenario: A EU store journal order is submitted to ORR and fulfilled successfully
    Given An order for a journal item from the EU store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @eustore @flashcards @orrflow
  Scenario: A EU store flash card order is submitted to ORR and fulfilled successfully
    Given An order for a flash card item from the EU store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @eustore @online @orrflow
  Scenario: A EU store online order is submitted to ORR and fulfilled successfully
    Given An order for an online item from the EU store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @eustore @CDROM @orrflow
  Scenario: A EU store CDROM order is submitted to ORR and fulfilled successfully
    Given An order for a CDROM item from the EU store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @eustore @DVD @orrflow
  Scenario: A EU store DVD order is submitted to ORR and fulfilled successfully
    Given An order for a DVD item from the EU store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @eustore @Poster @orrflow
  Scenario: A EU store poster order is submitted to ORR and fulfilled successfully
    Given An order for a poster item from the EU store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @eustore @PIN @orrflow
  Scenario: A EU store PIN order is submitted to ORR and fulfilled successfully
    Given An order for a PIN item from the EU store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @meastore @printbook @orrflow
  Scenario: A MEA store print book order is submitted to ORR and fulfilled successfully
    Given An order for a print book item from the MEA store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @meastore @ebook @orrflow
  Scenario: A MEA store eBook order is submitted to ORR and fulfilled successfully
    Given An order for an eBook item from the MEA store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @meastore @journal @orrflow
  Scenario: A MEA store journal order is submitted to ORR and fulfilled successfully
    Given An order for a journal item from the MEA store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @meastore @flashcards @orrflow
  Scenario: A MEA store flash card order is submitted to ORR and fulfilled successfully
    Given An order for a flash card item from the MEA store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @meastore @online @orrflow
  Scenario: A MEA store online order is submitted to ORR and fulfilled successfully
    Given An order for an online item from the MEA store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @meastore @CDROM @orrflow
  Scenario: A MEA store CDROM order is submitted to ORR and fulfilled successfully
    Given An order for a CDROM item from the MEA store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @meastore @DVD @orrflow
  Scenario: A MEA store DVD order is submitted to ORR and fulfilled successfully
    Given An order for a DVD item from the MEA store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @meastore @Poster @orrflow
  Scenario: A MEA store poster order is submitted to ORR and fulfilled successfully
    Given An order for a poster item from the MEA store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @meastore @PIN @orrflow
  Scenario: A MEA store PIN order is submitted to ORR and fulfilled successfully
    Given An order for a PIN item from the MEA store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @ushealthstore_fulltest @flashcards @orrflow
  Scenario: A US store flash card order is submitted to ORR and fulfilled successfully
    Given An order for a flash card item from the US store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @ushealthstore_fulltest @online @orrflow
  Scenario: A US store online order is submitted to ORR and fulfilled successfully
    Given An order for an online item from the US store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @ushealthstore_fulltest @CDROM @orrflow
  Scenario: A US store CDROM order is submitted to ORR and fulfilled successfully
    Given An order for a CDROM item from the US store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @ushealthstore_fulltest @DVD @orrflow
  Scenario: A US store DVD order is submitted to ORR and fulfilled successfully
    Given An order for a DVD item from the US store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @ushealthstore_fulltest @Poster @orrflow
  Scenario: A US store poster order is submitted to ORR and fulfilled successfully
    Given An order for a poster item from the US store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

  @ushealthstore_fulltest @PIN @orrflow
  Scenario: A US store PIN order is submitted to ORR and fulfilled successfully
    Given An order for a PIN item from the US store is generated
    When  The order is sent to ORR
    Then  No payment is taken in ORR for this order
    And   The order is fulfilled successfully with Delta

