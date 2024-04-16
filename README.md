## What is env-update-check
Env update check package provides checking system for environment variables, that ensures that you never forget to change environment variable again when you're deploying your application.

## How does it work?
Create .env.check file with variable names you want to check and their status as it's displayed below:

```
TEST_VARIABLE_1=unchanged
TEST_VARIABLE_2=unchanged
```

Setup `env-update-check` to run in your CI script.

Then each time you change variable value or add a new variable, change it's value to `changed` like below:
```
TEST_VARIABLE_1=changed
TEST_VARIABLE_2=unchanged
NEW_TEST_VARIABLE_3=changed
```

After your new code changes get to your staging or main branch, your build will fail until you both change the variable in your environment and then in .env.check file.

``` 
unchanged == no change
changed == changed - will error out on staging and prod
staging-changed == changed on staging - will error out on prod only 
```

Now commit your changes and enjoy (hopefully) smooth deployments. ⛵️

Currently production check is avaliable only when your production branch is named `main`. 
Tested only on Gitlab CI