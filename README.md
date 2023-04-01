# GT Transfer Tool: Find Courses that Transfer Back to GT

[GT Transfer Tool](gt-transfer-tool.com) helps you find courses that transfer back to Georgia Tech. It is similar to the existing [Transfer Equivalency Table](https://oscar.gatech.edu/pls/bprod/wwsktrna.P_find_location) except that it also goes in the reverse direction i.e. showing all transfer courses available for a specific GT class. With the availability of online classes in schools, you may no longer be limited to your local vicinity to find classes. This can especially be useful for general education requirements that are common across many schools.

GT Transfer Tool enables you to search by GT Class #, Transfer School, and State. You can also save courses for later.

GT Transfer Tool is built using Next.js, TypeScript, Chakra UI, and Typesense,  Azure, and Vercel. A Github Action automatically scrapes the existing transfer equivalency table once a month to ensure that the transfer data is accurate.

For local development, ensure that GT Transfer Tool runs on `http:localhost:3000` to avoid CORS errors when connecting to the backend. To run locally, download the repository and execute `npm run dev`.