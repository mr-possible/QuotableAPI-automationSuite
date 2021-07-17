import json

import requests
from behave import *

from utils.configurations import getConfig
from utils.headers import Headers
from utils.params import Params
from utils.payload import *


@given('the API request')
def step_impl(context):
    config = getConfig()
    context.endpoint = config['API']['baseurl'] + config['ENDPOINT']['endpoint']


@when('we execute the GET API request based on page number value :: {pagenumber}')
def step_impl(context, pagenumber):
    context.pageNumber = Params().getQuoteBasedOnPageNumber(pagenumber)
    context.response = requests.get(url=context.endpoint,
                                    params=getPageNumber(pagenumber),
                                    headers=Headers().get_content_json())


@then('the response should contain page number as the sent value.')
def step_impl(context):
    context.json_response = context.response.json()
    print(f'The response :: {json.dumps(context.json_response, indent=2)}')
    assert context.json_response['page'] == int(context.pageNumber)


@when('we execute the GET API request based on author name value :: {authorname}')
def step_impl(context, authorname):
    context.authorName = Params().getAuthorName(authorname)
    context.response = requests.get(url=context.endpoint,
                                    params=getAuthorName(authorname),
                                    headers=Headers().get_content_json())


@then('the response should list all the quotes which have author name as the {authorname}')
def step_impl(context, authorname):
    context.json_response = context.response.json()
    totalCount = context.json_response['totalCount']
    print(f'The response :: {json.dumps(context.json_response, indent=2)}')
    print(f'The total number of quotes by {authorname} is :: {totalCount}')
    for record in range(len(context.json_response['results'])):
        assert context.authorName == (context.json_response['results'][record]['authorSlug'])


@when('we execute the GET API request based on tag value :: {tags}')
def step_impl(context, tags):
    context.response = requests.get(url=context.endpoint,
                                    params=getTagsAndAuthor(tags),
                                    headers=Headers().get_content_json())


@then('the response should contain {tags} sent in the request.')
def step_impl(context, tags):
    context.json_response = context.response.json()
    print(f'The response :: {json.dumps(context.json_response, indent=2)}')
    for record in range(len(context.json_response['results'])):
        if ',' in tags:
            assert (item in list(tags.split('|')[0]) for item in context.json_response['results'][record]['tags'])
        elif '|' in tags:
            assert (item in list(tags) for item in context.json_response['results'][record]['tags'])
        else:
            assert list(tags) == context.json_response['results'][record]['tags']


@when('We execute API request with {tags} and {authorname}')
def step_impl(context, tags, authorname):
    context.tagNames = tags
    context.authorName = Params().getAuthorName(authorname)
    context.response = requests.get(url=context.endpoint,
                                    params=getTagsAndAuthor(tags, authorname),
                                    headers=Headers().get_content_json())


@then('Check response with {tags} and {authorname}')
def step_impl(context, tags, authorname):
    context.json_response = context.response.json()
    print(f'The response :: {json.dumps(context.json_response, indent=2)}')
    for record in range(len(context.json_response['results'])):
        if ',' in tags:
            assert (item in list(tags.split('|')[0]) for item in context.json_response['results'][record]['tags'])
            assert context.authorName == (context.json_response['results'][record]['authorSlug'])
        elif '|' in tags:
            assert (item in list(tags) for item in context.json_response['results'][record]['tags'])
            assert context.authorName == (context.json_response['results'][record]['authorSlug'])
        else:
            assert (item in list(tags) for item in context.json_response['results'][record]['tags'])
            assert context.authorName == (context.json_response['results'][record]['authorSlug'])