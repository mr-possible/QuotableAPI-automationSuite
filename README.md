# QuotableAPI-automationSuite

This is a small API test automation solution which caters to the following set of tests: 

* Smoke tests
* Regression

# Technology Stack used in making this repository 
 - ##### BDD - <u>behave</u>
 - #### Language - <u>Python 3.9 </u>
 - #### IDE - <u>PyCharm</u>
 - #### Version Control - <u>Git</u>
 - #### For CI/CD - <u>Jenkins</u>


## Folder structure
```
QuotableAPI-automation
|      README.md
|      .gitignore 
|      requirements.txt
|_____ allure-report/
|_____ AllureReports/
|_____ features/
|        |___steps
|            |_____stepImpl.java
|        |___environment.py
|        |___ ... (tests/feature files)
|_____ jenkins-screenshots/
|         |___ ... (screenshots in jpg/png format)
|_____ utils/
         |___ configurations.py
         |___ headers.py
         |___ params.py
         |___ payload.py
         |___ properties.ini
```



## Instruction for the reader to try hands on execution

### <i>Step 01</i> : 
 - Please make sure you clone the repository in your local machine through correct git repo URL.
 - The URL for this git repo can be found [here](https://github.com/mr-possible/QuotableAPI-automationSuite).
 - Please copy the ``https/ssh`` type, whatever suits you the best.

### <i>Step 02</i> :
 - Once the repo URL copied and the repo is cloned, please open you terminal. (in the current directory)
 - Once the terminal is opened, run the following command : 
        ``` pip install -r requirements.txt ```
 - The ``requirements.txt`` is a file which tells python to install all the dependancies which are listed in that file.
    - NOTE : <i>The versions are frozen. If you want to bump any dependancy to later version or change it for whatsoever reason, please raise a pull request and upon review, I will merge it.</i>

### <i>Step 03</i> :
 - One the above command runs successfully without any error, run the following command to run all the tests/feature files :     
        ``` 
        behave -f allure_behave.formatter:AllureFormatter -o AllureReports  
        ```
   - This will generate json files based on the number of scenarios you run. So for example - in the above command, we haven't specified the file name to run, hence all the scenarios/files will be executed.
   - If in case you want to run a particular file :  
     ```
     behave features/<filename>.feature -f allure_behave.formatter:AllureFormatter -o AllureReports  
     ```
 - After above command, run the following command to generate the report :      
        ``` 
        allure generate ./AllureReports --clean 
        ```

### <i>Optional Step (A)</i> :
 - There may be instances where the tester may want to run specific suites, i.e., regression or smoke.
    - In such cases, the ``behave`` utility provides us with a tagging mechanism to categorise any feature file with some tags like @regression or @smoke.
    - If we want to run only regression related cases, then please run the following command : 
        ```
            behave -f allure_behave.formatter:AllureFormatter -o AllureReports --tags=regression
        ```
### <i>Optional Step (B)</i> :
 - There may also be instances where the tester may want to see the logs/console prints for debugging at times.
    - In such cases, the ``behave`` utility provides us with an extra attribute in the command to do just this.
    - Please run the following command : 
        ```
            behave --no capture -f allure_behave.formatter:AllureFormatter -o AllureReports --tags=regression
        ```

### <i>Final Step</i> :
 - Please open ``allure-report`` folder and look for ``index.html`` file.
 - Open that file in your desired web browser. That file is the allure report of our execution.


