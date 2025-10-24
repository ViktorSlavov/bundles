# Data Processing Workflow Overview

Each folder (except the **JsonSchema** folder) contains five key files that represent different stages of the data processing pipeline related to Jira data integration and assessment:

| Filename           | Description                                               |
|--------------------|-----------------------------------------------------------|
| **Fetch**          | Contains raw data fetched directly from the Jira instance. |
| **Mapping**        | Data mapped and structured according to the defined JSON schema. |
| **Transformation** | Contains the result after transforming the mapped data for further use. |
| **Assessment**     | Payload prepared and sent to Concert for assessment purposes. |
| **Outputs**        | Consolidated output combining all previous data into a single file. |

#### Note: Each file builds upon the previous file.

---

## JsonSchema Folder

The **JsonSchema** folder contains the JSON schema definitions file.json responsible for the **Mapping** function. These schemas define the structure and rules used to map raw Jira data values into the required format for downstream processing.
