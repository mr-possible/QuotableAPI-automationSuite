Feature: Verify if tag value is correct as per the query parameter in the API GET request.

  Scenario Outline: Verify tag value
    Given the API request
    When we execute the GET API request based on tag value :: <tags>
    Then the response should contain <tags> sent in the request.
    Examples:
      | tags                     |
      | technology,famous-quotes |
      | famous-quotes\|science   |