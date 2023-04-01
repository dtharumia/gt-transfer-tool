# GT Transfer Tool: Find Courses that Transfer Back to GT

[GT Transfer Tool](https://gt-transfer-tool.com) helps you find courses that transfer back to Georgia Tech. It is similar to the existing [Transfer Equivalency Table](https://oscar.gatech.edu/pls/bprod/wwsktrna.P_find_location) except that it also goes in the reverse direction i.e. showing all transfer courses available for a specific GT class. With the availability of online classes in schools, you may no longer be limited to your local vicinity to find classes. This can especially be useful for general education requirements that are common across many schools.

GT Transfer Tool enables you to search by GT Class #, Transfer School, and State. You can also save courses for later.

## Transfer Policy Excerpts

The following are excerpts from the [GT Registrar's Office](https://registrar.gatech.edu/info/transfer-credit-online-courses):

> Georgia Tech accepts credit for coursework as listed on the transfer equivalency table online at oscar.gatech.edu. If the course is not listed on the transfer equivalency site, the course must be submitted for review to Transfer Credit site.
> 
> If the transfer equivalency site states: No Credit for Online Section, you will need to submit a syllabus for the course to be reviewed. Please allow time for review and the update on the equivalency table.
 
## Codebase

GT Transfer Tool is built using Next.js, TypeScript, Chakra UI, Typesense, Python, Selenium, Azure, and Vercel. A Github Action automatically scrapes the existing transfer equivalency table once a month to ensure that the transfer data is accurate.

For local development, ensure that GT Transfer Tool runs on `http:localhost:3000` to avoid CORS errors when connecting to the backend. To run locally, download the repository and execute `npm run dev`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

