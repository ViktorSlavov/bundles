# GitLab Fetch Repositories From Group Workflow

This documentation explains the steps to set up and run a workflow that ingests source repositories from GitLab based on the Group Name and ingests them to Concert. The guide also covers how to obtain the Group Name from GitLab.

## What is Group Name in GitLab?

In GitLab, a **Group Name** is the name assigned to each group within a GitLab instance.

### How to Find Group Name in GitLab
1. **Via GitLab UI:**
   - Go to your GitLab project in the web interface.
   - Navigate to **Groups** in **Your Work** Section.
   - Here you can find the list of the groups
  


---

## GitLab Workflow

Import the workflow inside the `GitLab` folder in Concert Workflows.

### Setup and Run Workflow
1. **Create Gitlab Authentication** 
2. **Create Concert Authentication** 
3. **Provide the rest of the inputs** as shown in the screenshot.
4. **Save and run** the workflow.

---

### 1. Concert API Key Authentication:
   - Go to **Workflows > Authentications** and create an API key for Concert.
   - Provide the API key of your Concert instance.

### 2. Concert Configuration Authentication:
   - Create a Config Data for Concert.
   - Provide the following details:
     ```json
     {
       "concert_host": "test.fyre.ibm.com",         // Concert host URL
       "concert_port": "12443",                     // Concert port
       "concert_instance_id": "0000-0000-0000-0000" // Concert instance ID
     }
     ```

### 3. GitLab Authentication
1. Go to **Workflows > Authentications > Create Authentication**.
2. Provide a name (e.g., `git-token`).
3. Select **GitLab** from the service dropdown.
4. Enter your **GitLab Token** in the field `Access Token`.
5. Provide `https://gitlab.com` in the `Domain` field.
6. Click `Create` to generate your auth token.
7. Use this auth token in your PR workflow as the value for the `gitlab_auth_key` field.

---

## Inputs to the Workflow
- **Authentication Details:**
  - `concert_api_key_auth`: Concert API Key Authentication 
  - `gitlab_auth_key`: GitLab Authentication
  - `concert_config_auth`: Concert Configuration Authentication:

- **Optional Details**
  - **Group Details:** `group_name` (Obtained as described above).
  - `results_per_page` - For Pagination, by default it is set to 20.

  Note-
If `group_name` is not specified in the workflow input then data will be retrived for all the groups
---

## Setup and Run Workflow
1. After configuring all the necessary input variables and authentication details, save the workflow.
2. Click `Run` to execute the workflow.

