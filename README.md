# QATest

Starting setup
Account is already made and setup with a mail and a password, with all the generic settings for that profile (selecting avatar, selected profile, etc.)

Executing it with a report being written and opening up once it's finished
```
npx playwright test
```

Execute only a specific browser
```
npx playwright test --project chromium
```

Executing the program in UI mode
```
npx playwright test --ui
```

Executing the program in a specific browser while seeing what the program is doing by opening the browsers visually
```
npx playwright test --project chromium --headed 
```


