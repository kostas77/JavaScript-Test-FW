#Kitchen Sink Testing With Gemini

Gemini is used to complete visual checking as part of the Elsevier.com UI framework changes.  It uses the Kitchen Sink page to compare known visuals
against the latest layout and styling changes, highlighting any discrepancies for investigation.

##To set up:
* Clone this testing repo to local
* Run `npm install`
* Update `.gemini.yml` to reflect the platform and browser to be tested
* Ensure correct rootUrl is present in `.gemini.yml`
* Check that the Selenium Grid is up and running, either on your local machine or on the VM (**10.48.80.235**). There are .bat files in **C:\Automation** to launch the hub and node
* Make sure that the gridUrl in `.gemini.yml` is correct

##To gather the base images from a known acceptable version of the Kitchen Sink:
* To gather new/updated images from an accepted version of the Kitchen Sink run `MERCUTIO=x.xx.xx ./node_modules/gemini/bin/gemini update kitchenSinkTest.js` where `x.xx.xx` = working version
* These screenshots will be placed in ./screens in a path defined within .gemini.yml per browser

##To run tests against the known images for a new version of the Kitchen Sink:
* To run the tests against these base screenshots run `MERCUTIO=y.yy.yy ./node_modules/gemini/bin/gemini test --reporter html --reporter flat kitchenSinkTest.js` where `y.yy.yy` = version under test
* Can leave off whichever reporter method not required, if not are specified it will default to the flat format
* Html report index.html is found in `./gemini-report/`

#CLI

Usage: gemini [options] [command]

Options:
  -V, --version                       output the version number
  -c, --config <file>                 config file
  -b, --browser <browser>             run test only in specified browser
  -s, --set <set>                     set to run
  --grep <pattern>                    run only suites matching the pattern
  -h, --help                          output usage information

Commands:
  update [options] [paths...]         update the changed screenshots or gather if they doesn't exist
  test [options] [paths...]           run tests
  list <key>                          Use 'list browsers' or 'list sets' to get all available browsers or sets.
  gui [options] [paths...]            update the changed screenshots or gather them if they does not exist
  merge-reports [options] [paths...]  merge reports

  Overriding config:

    To override any config option use full option path converted to --kebab-case.

    Examples:
      gemini test --system-debug true
      gemini update --root-url http://example.com
      gemini test --browsers-ie-8-window-size 1024x768

    You can also use environment variables converted to snake_case with
    gemini_ prefix.

    Examples:
      gemini_system_debug=true gemini test
      gemini_root_url=http://example.com gemini update
      gemini_browsers_ie8_window_size=1024x768 gemini test

    If both cli flag and env var are used, cli flag takes precedence.
    For more information see https://gemini-testing.github.io/doc/config.html

##Things to note:

* Cannot run these tests on a Mac Retina screen - Chrome cannot compensate for the resolution and takes images at the wrong 
location - [issue 208](https://github.com/gemini-testing/gemini/issues/208)
* Cannot run against Safari - issue with the current version of SafariDriver - [issue 84](https://github.com/gemini-testing/gemini/issues/84),
caused by selenium [issue 4136](https://code.google.com/p/selenium/issues/detail?id=4136) 
* Firefox does not currently work with Selenium past FF v47.  If you want to run against FF v47 you will need to regress the Grid back to using `selenium-server-standalone-2.53.*`

