<h3>importData.js</h3>
A standalone script for for importing data from CSV files in your PostgreSQL database.

<h3>server.js</h3>
An API server to interact with the data stored in the database.

The data shared through the PostgreSQL database.

<ul>
<li>Postman successfuly downloanded</li>
<li>The server.js created, the server successfully starts.</li>

<li>Still tackling the subject issue on how to incorporate the subject color when 1 populates instead of 0.</li>
</ul>

Notes:

To map the colors associated with the "1" in your CSV data, you create a logic that checks the bit pattern and outputs the corresponding color.

Since the CSV data for subject contains a string of zero's and ones, each "1" corresponds t a specifc color (or sibject, in this case).

1. Define the color/subject mapping:
