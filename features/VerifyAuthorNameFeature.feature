Feature: Verify if Author Name is correct as per the query parameter in the API GET request.

  Scenario Outline: Verify Author Name
    Given the API request
    When we execute the GET API request based on author name value :: <authorname>
    Then the response should list all the quotes which have author name as the <authorname>
    Examples:
      | authorname      |
      | eric-hoffer     |
      | albert-einstein |