# Re-Run Discovery Ingestion Job

This workflow re-runs the discovery ingestiion jobs in IBM Concert whose names are provided as input to the workflow

### Setup and Run Workflow
1. **Create Concert Authentication** 
2. **Provide the rest of the inputs** (described below).
3. **Save and run** the workflow.

### Inputs to the Workflow 

`concertAuth` - Hub Self Auth of IBM Concert(recommended) or Concert API key Authentication

`discoveryIngestionJobName` - Array of names of Discovery ingestion jobs to be re-run.

`ingestionJobType` - Type of job e.g. kubernetes, OCP etc (This input filed is enum and currently supports "eks","rosa","iks","roks","kubernetes","ocp")

### After configuring all the necessary input variables and authentication details, save the workflow.

After the execution of the Workflow, The discovery ingestion jobs will be re-run. The jobs details will be available at `Administration > Integrations` and `Event Log` Tab

## Steps To Schedule the Workflow

1. Import the Workflow
   
2. Provide input parameters to the Workflow
   
3. Navigate to `Jobs` section in workflow

![image](https://github.ibm.com/roja/concert-workflows/assets/455197/8b78808c-71e2-45d1-ab08-316bd5b7899c)

4. Click on `Create Jobs`

![image](https://github.ibm.com/roja/concert-workflows/assets/455197/a066a465-b098-417b-8824-ff4d091236b7)

5. Provide details about the job like time interval etc

![image](https://github.ibm.com/roja/concert-workflows/assets/455197/602c409c-6be1-4136-8bb5-654e76dd13c9)

6. Save the details and enable the scheduled job
   
![image](https://github.ibm.com/roja/concert-workflows/assets/455197/1921fece-ae6c-4007-9373-9f280b54f0f3)


