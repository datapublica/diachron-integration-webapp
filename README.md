# Diachron integration web app

### How to run locally
1. npm start
2. navigate to 'localhost/8080'

### How to build a deployment bundle
1. npm run bundle



### change visualization strategy

stats par type de changement


DELETE_MEASURE
ADD_MEASURE



##### columns added or removed from fact table

Show 10 rows of fact table
highlight added columns
lowlight removed columns
have a logic to show only some of the unchanged columns

related change types:
- ATTACH_MEASURE_TO_FT("fact_table", "measure"),
- ATTACH_DIMENSION_TO_FT("dimension", "fact_table"),
- DETACH_DIMENSION_FROM_FT("dimension", "fact_table"),
- DETACH_MEASURE_FROM_FT("fact_table", "measure"),


##### codelist instance addition or removal

occurence histogram for new and old version with
added codelist instance bars highlighted in the new versions
removed codelist instance bar lowlighted in the old version

related change types:
- ATTACH_INSTANCE_TO_CODELIST("codelist", "instance"),
- DETACH_INSTANCE_FROM_CODELIST("codelist", "hierarchy", "instance"),


##### Observation removal or addition

If the number of changes is small
    show "bottom" of fact table, with added rows highlighted and removed rows lowlighted
Else
    show numbers of observations added and removed.

related change types:
- ATTACH_OBSERVATION_TO_FT("fact_table", "observation"),
- DETACH_OBSERVATION_FROM_FT("fact_table", "observation"),


##### Data added and removed from observations


##### Changes without graphical representation

- ADD_ATTRIBUTE("attribute"),
- ADD_CODELIST("codelist"),
- ADD_DATATYPE("datatype", "subject"),
- ADD_DIMENSION("dimension"),
- ADD_DIMENSION_VALUE_TO_OBSERVATION("dimension", "dimension_val"),
- ADD_FACT_TABLE("fact_table"),
- ADD_GENERIC_ATTRIBUTE("attribute", "subj"),
- ADD_GENERIC_VALUE_TO_OBSERVATION("observation", "property", "value"),
- ADD_HIERARCHY("hierarchy"),
- ADD_INSCHEME("scheme", "subj"),
- ADD_INSTANCE("instance"),
- ADD_INSTANCE_TO_PARENT("instance", "parent"),
- ADD_LABEL("obj_label", "prop_label", "subj_label"),
- ADD_MEASURE("measure"),
- ADD_MEASURE_VALUE_TO_OBSERVATION("measure", "measure_val"),
- ADD_OBSERVATION("observation"),
- ADD_RELEVANCY("1st_arg", "2nd_arg"),
- ADD_UNKNOWN_PROPERTY("obj_un_prop", "prop_un_prop", "subj_un_prop"),
- ATTACH_ATTR_TO_DIMENSION("attribute", "dimension"),
- ATTACH_ATTR_TO_MEASURE("attribute", "measure"),
- ATTACH_CODELIST_TO_DIMENSION("codelist", "dimension"),
- ATTACH_DATATYPE_TO_DIMENSION("datatype", "dimension"),
- ATTACH_HIERARCHY_TO_DIMENSION("dimension", "hierarchy"),
- ATTACH_INSTANCE_TO_HIERARCHY("hierarchy", "instance"),
- ATTACH_INSTANCE_TO_PARENT("instance", "parent"),
- ATTACH_TYPE_TO_MEASURE("measure", "type"),
- DELETE_ATTRIBUTE("attribute"),
- DELETE_CODELIST("codelist"),
- DELETE_DATATYPE("1st_arg", "2nd_arg", "datatype", "subject"),
- DELETE_DIMENSION("dimension"),
- DELETE_DIMENSION_VALUE_FROM_OBSERVATION("dimension", "dimension_val"),
- DELETE_FACT_TABLE("fact_table"),
- DELETE_GENERIC_ATTRIBUTE("attribute", "subj"),
- DELETE_GENERIC_VALUE_FROM_OBSERVATION("observation", "property", "value"),
- DELETE_HIERARCHY("hierarchy"),
- DELETE_INSCHEME("scheme", "subj", "instance"),
- DELETE_INSTANCE_FROM_PARENT("instance", "parent"),
- DELETE_LABEL("obj_label", "prop_label", "subj_label"),
- DELETE_MEASURE("measure"),
- DELETE_MEASURE_VALUE_FROM_OBSERVATION("measure", "measure_val"),
- DELETE_OBSERVATION("observation"),
- DELETE_RELEVANCY("1st_arg", "2nd_arg", "datatype", "subject"),
- DELETE_UNKNOWN_PROPERTY("obj_un_prop", "prop_un_prop", "subj_un_prop"),
- DETACH_ATTR_FROM_DIMENSION("attribute", "datatype", "dimension"),
- DETACH_ATTR_FROM_MEASURE("attribute", "measure"),
- DETACH_CODELIST_FROM_DIMENSION("dimension"),
- DETACH_DATATYPE_FROM_DIMENSION("attribute", "datatype", "dimension"),
- DETACH_HIERARCHY_FROM_DIMENSION("dimension", "hierarchy"),
- DETACH_INSTANCE_FROM_HIERARCHY("hierarchy", "instance"),
- DETACH_INSTANCE_FROM_PARENT("instance", "parent"),
- DETACH_TYPE_FROM_MEASURE("measure", "type");
