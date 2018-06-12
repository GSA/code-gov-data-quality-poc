# code-gov-data-quality-poc

Code.gov data quality scoring proof of concept

## Objective

Our objective is to visualize what a scoring engine for Code.gov data quality could look like. This initial step is a extremely naive approach.

### How are we scoring

In the effort to quantify the data quality of our repos I've assigned points to our schema fields.
These points will be given to each field and added to make the "quality total" of the repository.
This "quality total" will then be added to the data we index in Elasticsearch.

It's important to note that this is not a search score but our quality score.
The regular search score that we use from Elasticsearch will not be affected or substituted by this.

### 1 point fields

* name
* description
* permissions.licenses
* permissions.licenses.URL
* permissions.licenses.name
* permissions.usageType
* permissions.exemptionText
* organization
* contact.email
* contact.name
* contact.URL
* contact.phone
* tags
* laborHours

### 0.8 point fields

* languages
* repositoryURL
* homepageURL
* downloadURL
* vcs

### 0.6 point fields

* date.created
* date.lastModified
* date.metadataLastUpdated
* version
* status

### 0.4 point fields

* disclaimerURL
* disclaimerText
* relatedCode.name
* relatedCode.URL
* reusedCode.name
* reusedCode.URL
* partners.name
* partners.email

### 0.2 point fields

* target_operating_systems

### 0.1 point fields

* additional_information
