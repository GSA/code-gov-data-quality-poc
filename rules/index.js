function getScore(target, value) {
  return target.score ? target.score + value : value;
}

function getFieldWeight(field) {
  const fields = {
    "name": 1,
    "description": 1,
    "permissions.licenses": 1,
    "permissions.licenses.URL": 1,
    "permissions.licenses.name": 1,
    "permissions.usageType": 1,
    "permissions.exemptionText": 1,
    "organization": 1,
    "contact.email": 1,
    "contact.name": 1,
    "contact.URL": 1,
    "contact.phone": 1,
    "tags": 1,
    "laborHours": 1,
    "languages": 0.8,
    "repositoryURL": 0.8,
    "homepageURL": 0.8,
    "downloadURL": 0.8,
    "vcs": 0.8,
    "date.created": 0.6,
    "date.lastModified": 0.6,
    "date.metadataLastUpdated": 0.6,
    "version": 0.6,
    "status": 0.6,
    "disclaimerURL": 0.4,
    "disclaimerText": 0.4,
    "relatedCode.name": 0.4,
    "relatedCode.URL": 0.4,
    "reusedCode.name": 0.4,
    "reusedCode.URL": 0.4,
    "partners.name": 0.4,
    "partners.email": 0.4,
    "target_operating_systems": 0.2,
    "additional_information": 0.1
  }

  return fields[field] ? fields[field] : 0;
}


export default function () {
  return [
    {
      validation: function (target) {
        return target['name'] ? true : false;
      },
      outcome: function (target) {
        target.score = getScore(target.score, getFieldWeight('name'));
        return target;
      }
    },
    {
      validation: function (target) {
        let isValid = false;
        if (target['description']) {
          isValid = target['description'] === target['name'] ? false : true;
        }
        
        isValid = target['description'].split(' ').length > 3
        
        return isValid;
      },
      outcome: function (target) {
        const description = target['description'].split(' ');

        if (description.length > 30) {
          target.score = getScore(target.score, getFieldWeight('description'));
        } else if (description.length < 30 && description.length > 10) {
          target.score = getScore(target.score, 0.5);
        } else {
          target.score = getScore(target.score, 0.1);
        }
        
        return target;
      }
    },
    {
      validation: function (target) {
        const url = target['permissions.licenses.URL'];
        if (url) {
          return url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g)
            ? true
            : false;
        }
        return false;
      },
      outcome: function (target) {
        target.score = getScore(target.score, getFieldWeight('permissions.licenses.URL'));
        return target;
      }
    },
    {
      validation: function (target) {
        return target['permissions.licenses.name'] ? true : false;
      },
      outcome: function (target) {
        target.score = getScore(target.score, getFieldWeight('permissions.licenses.name'));
        return target;
      }
    },
    {
      validation: function (target) {
        return target['permissions.usageType'] ? true : false;
      },
      outcome: function (target) {
        const usageType = target['permissions.usageType']

        if (usageType.toLowerCase() === 'opensource') {
          target.score = getScore(target.score, getFieldWeight('permissions.usageType'));
        } else if (usageType.toLowerCase() === 'governmentwidereuse') {
          target.score = getScore(target.score, 0.5);
        } else {
          target.score = getScore(target.score, 0.1);
        }
        
        return target;
      }
    },
    {
      validation: function (target) {
        if(target['permissions.usageType']){
          return target['permissions.exemptionText'] ? true : false;
        }
      },
      outcome: function (target) {

      }
    },
    {
      field: "organization",
      validation: function (value) {

      },
      outcome: function (target) {

      }
    },
    {
      field: "contact.email",
      validation: function (value) {

      },
      outcome: function (target) {

      }
    },
    {
      field: "contact.name",
      validation: function (value) {

      },
      outcome: function (target) {

      }
    },
    {
      field: "contact.URL",
      validation: function (value) {

      },
      outcome: function (target) {

      }
    },
    {
      field: "contact.phone",
      validation: function (value) {

      },
      outcome: function (target) {

      }
    },
    {
      field: "tags",
      validation: function (value) {

      },
      outcome: function (target) {

      }
    },
    {
      field: "laborHours",
      validation: function (value) {

      },
      outcome: function (target) {

      }
    },
    {
      field: "languages",
      validation: function (value) {

      },
      outcome: function (target) {

      }
    },
    {
      field: "repositoryURL",
      validation: function (value) {

      },
      outcome: function (target) {

      }
    },
    {
      field: "homepageURL",
      validation: function (value) {

      },
      outcome: function (target) {

      }
    },
    {
      field: "downloadURL",
      validation: function (value) {

      },
      outcome: function (target) {

      }
    },
    {
      field: "vcs",
      validation: function (value) {

      },
      outcome: function (target) {

      }
    },
    {
      field: "date.created",
      validation: function (value) {

      },
      outcome: function (target) {

      }
    },
    {
      field: "date.lastModified",
      validation: function (value) {

      },
      outcome: function (target) {

      }
    },
    {
      field: "date.metadataLastUpdated",
      validation: function (value) {

      },
      outcome: function (target) {

      }
    },
    {
      field: "version",
      validation: function (value) {

      },
      outcome: function (target) {

      }
    },
    {
      field: "status",
      validation: function (value) {

      },
      outcome: function (target) {

      }
    },
    {
      field: "disclaimerURL",
      validation: function (value) {

      },
      outcome: function (target) {

      }
    },
    {
      field: "disclaimerText",
      validation: function (value) {

      },
      outcome: function (target) {

      }
    },
    {
      field: "relatedCode.name",
      validation: function (value) {

      },
      outcome: function (target) {

      }
    },
    {
      field: "relatedCode.URL",
      validation: function (value) {

      },
      outcome: function (target) {

      }
    },
    {
      field: "reusedCode.name",
      validation: function (value) {

      },
      outcome: function (target) {

      }
    },
    {
      field: "reusedCode.URL",
      validation: function (value) {

      },
      outcome: function (target) {

      }
    },
    {
      field: "partners.name",
      validation: function (value) {

      },
      outcome: function (target) {

      }
    },
    {
      field: "partners.email",
      validation: function (value) {

      },
      outcome: function (target) {

      }
    },
    {
      field: "target_operating_systems",
      validation: function (value) {

      },
      outcome: function (target) {

      }
    },
    {
      field: "additional_information",
      validation: function (value) {

      },
      outcome: function (target) {

      }
    },
  ]
}