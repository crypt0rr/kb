---
title : "Cypherhound"
# pre : ' '
description : "Python3 terminal application that contains 260+ Neo4j cyphers for BloodHound data sets."
date : 2023-01-03T12:19:14+01:00
# hidden : true
# draft : true
weight : 410
tags : ['Other', 'Active Directory', 'AzureAD/EntraID']
---

---

A `Python3` terminal application that contains 260+ `Neo4j` cyphers for BloodHound data sets.

`BloodHound` is a staple tool for every red teamer. However, there are some negative side effects based on its design. I will cover the biggest pain points I've experienced and what this tool aims to address:

1. My tools think in lists - until my tools parse exported `JSON` graphs, I need graph results in a line-by-line format `.txt` file
2. Copy/pasting graph results - this plays into the first but do we need to explain this one?
3. Graphs can be too large to draw - the information contained in any graph can aid our goals as the attacker and we *need* to be able to view *all* data efficiently
4. Manually running custom cyphers is time-consuming - let's automate it :)

This tool can also help blue teams to reveal detailed information about their Active Directory environments as well.

## Installation

```plain
git clone https://github.com/fin3ss3g0d/cypherhound
cd cypherhound
python3 -m pip install -r requirements.txt
```

## Usage

- '-u' - neo4j user
- '-p' - password for the neo4j user (**NOTE** this may be stored in history if logging enabled (default))

```plain
python3 cypherhound.py [-h] -u USER -p PWD
```

## Command Menu

```plain
set - used to set search parameters for cyphers, double/single quotes not required for any sub-commands
    sub-commands
        user - the user to use in user-specific cyphers (MUST include @domain.name)
        group - the group to use in group-specific cyphers (MUST include @domain.name)
        computer - the computer to use in computer-specific cyphers (SHOULD include .domain.name or @domain.name)
        regex - the regex to use in regex-specific cyphers
    example
        set user svc-test@domain.local
        set group domain admins@domain.local
        set computer dc01.domain.local
        set regex .*((?i)web).*
run - used to run cyphers
    parameters
        cypher number - the number of the cypher to run
    example
        run 7
export - used to export cypher results to txt files
    parameters
        cypher number - the number of the cypher to run and then export
        output filename - the number of the output file, extension not needed
        raw - write raw output or just end object (optional)
    example
        export 31 results
        export 42 results2 raw
list - used to show a list of cyphers
    parameters
        list type - the type of cyphers to list (general, user, group, computer, regex, all)
    example
        list general
        list user
        list group
        list computer
        list regex
        list all
q, quit, exit - used to exit the program
clear - used to clear the terminal
help, ? - used to display this help menu
```

## Options

```plain
1.) List all kerberoastable users
2.) List user CanRDP privileges
3.) List group CanRDP privileges
4.) List all Unconstrained Delegation
5.) List all unsupported OSs
6.) List groups containing "admin"
7.) List users containing "admin"
8.) List all user shortest paths to admin groups
9.) List all group shortest paths to admin groups
10.) List all computer shortest paths to admin groups
11.) List groups containing "sql"
12.) List users containing "sql"
13.) List computers containing "sql"
14.) List all user shortest paths to SQL groups
15.) List all group shortest paths to SQL groups
16.) List all computer shortest paths to SQL groups
17.) List users containing "svc/service"
18.) List all user shortest paths to service groups
19.) List all group shortest paths to service groups
20.) List all computer shortest paths to service groups
21.) List users containing "web"
22.) List groups containing "web"
23.) List computers containing "web"
24.) List all user shortest paths to web groups
25.) List all group shortest paths to web groups
26.) List all computer shortest paths to web groups
27.) List users containing "dev"
28.) List groups containing "dev"
29.) List computers containing "dev"
30.) List users containing "prod"
31.) List groups containing "prod"
32.) List computers containing "prod"
33.) List all Domain Admins
34.) List all user shortest paths to Domain Admins
35.) List all group shortest paths to Domain Admins
36.) List all computer shortest paths to Domain Admins
37.) List all Enterprise Admins
38.) List all user shortest paths to Enterprise Admins
39.) List all group shortest paths to Enterprise Admins
40.) List all computer shortest paths to Enterprise Admins
41.) List all sessions
42.) List all AS-REP roastable users
43.) List all high-value groups
44.) List all members of high-value groups
45.) List all user shortest paths to high-value targets
46.) List all group shortest paths to high-value targets
47.) List all computer shortest paths to high-value targets
48.) List all user shortest paths to Exchange groups
49.) List all group shortest paths to Exchange groups
50.) List all computer shortest paths to Exchange groups
51.) List user AdminTo privileges
52.) List group AdminTo privileges
53.) List user ReadLAPSPassword privileges
54.) List group ReadLAPSPassword privileges
55.) List Domain Admin sessions
56.) List Enterprise Admin sessions
57.) List all users
58.) List all groups
59.) List all computers
60.) List all enabled computers
61.) List all disabled computers
62.) List all Domain Controllers
63.) List all Domain Controllers OSs
64.) List all user shortest paths to Domain Controllers
65.) List all group shortest paths to Domain Controllers
66.) List all computer shortest paths to Domain Controllers
67.) List all users that don't require a password
68.) List user Constrained Delegation
69.) List group Constrained Delegation
70.) List computer Constrained Delegation
71.) List all GPOs
72.) List computers with LAPS enabled
73.) List computers with LAPS disabled
74.) List potential passwords in descriptions
75.) List all high-value users
76.) List all sensitive users
77.) List all users with an admin count
78.) List all groups with an admin count
79.) List all computers with an admin count
80.) List all computer AdminTo privileges
81.) List all user ReadGMSAPassword privileges
82.) List all group ReadGMSAPassword privileges
83.) List all computer ReadGMSAPassword privileges
84.) List all computer ReadLAPSPassword privileges
85.) List all user DCSync privileges
86.) List all group DCSync privileges
87.) List all computer DCSync privileges
88.) List all DCSync privileges
89.) List all user ForceChangePassword privileges
90.) List all group ForceChangePassword privileges
91.) List all computer ForceChangePassword privileges
92.) List all user AddMember privileges
93.) List all group AddMember privileges
94.) List all computer AddMember privileges
95.) List all user AddSelf privileges
96.) List all group AddSelf privileges
97.) List all computer AddSelf privileges
98.) List all user SQLAdmin privileges
99.) List all group SQLAdmin privileges
100.) List all computer SQLAdmin privileges
101.) List all user CanPSRemote privileges
102.) List all group CanPSRemote privileges
103.) List all computer CanPSRemote privileges
104.) List all user ExecuteDCOM privileges
105.) List all group ExecuteDCOM privileges
106.) List all computer ExecuteDCOM privileges
107.) List all user AllowedToAct privileges
108.) List all group AllowedToAct privileges
109.) List all computer AllowedToAct privileges
110.) List all user Owns privileges
111.) List all group Owns privileges
112.) List all computer Owns privileges
113.) List all user AllExtendedRights privileges
114.) List all group AllExtendedRights privileges
115.) List all computer AllExtendedRights privileges
116.) List all user memberships
117.) List all group memberships
118.) List all computer memberships
119.) List all user AddKeyCredentialLink privileges
120.) List all group AddKeyCredentialLink privileges
121.) List all computer AddKeyCredentialLink privileges
122.) List all user GenericAll privileges
123.) List all group GenericAll privileges
124.) List all computer GenericAll privileges
125.) List all user WriteDacl privileges
126.) List all group WriteDacl privileges
127.) List all computer WriteDacl privileges
128.) List all user WriteOwner privileges
129.) List all group WriteOwner privileges
130.) List all computer WriteOwner privileges
131.) List all user GenericWrite privileges
132.) List all group GenericWrite privileges
133.) List all computer GenericWrite privileges
134.) List groups containing "svc/service"
135.) List all user descriptions
136.) List all group descriptions
137.) List all emails
138.) List all OUs
139.) List all Containers
140.) List all Domains
141.) List all Domains functional level
142.) List all object control over OUs
143.) List all object control over Containers
144.) List all object control over GPOs
145.) List all GP Links
146.) List all user privileges
147.) List all group privileges
148.) List all computer privileges User-Specific Cyphers
149.) List this user's RDP privileges
150.) List this user's group-delegated RDP privileges
151.) List this user's AdminTo privileges
152.) List this user's group-delegated AdminTo privileges
153.) List this user's sessions
154.) List this user's ReadLAPSPassword privileges
155.) List this user's ReadGMSAPassword privileges
156.) List this user's Constrained Delegation privileges
157.) List this user's ForceChangePassword privileges
158.) List this user's AddMember privileges
159.) List this user's AddSelf privileges
160.) List this user's SQLAdmin privileges
161.) List this user's CanPSRemote privileges
162.) List this user's ExecuteDCOM privileges
163.) List this user's AllowedToAct privileges
164.) List this user's Owns privileges
165.) List this user's AllExtendedRights privileges
166.) List this user's AddKeyCredentialLink privileges
167.) List this user's GenericAll privileges
168.) List this user's WriteDacl privileges
169.) List this user's WriteOwner privileges
170.) List this users's GenericWrite privileges
171.) List this users's description
172.) List this users's email
173.) List this users's group memberships
174.) List if this users's AS-REP roastable
175.) List if this users's kerberoastable
176.) List all privileges for this user
177.) List all group-delegated privileges for this user
178.) List all shortest paths to high-value targets for this user
179.) List all shortest paths to Domain Admins for this user
180.) List all shortest paths to Enterprise Admins for this user
181.) List all shortest paths to Domain Controllers for this user
182.) List all shortest paths to Exchange groups for this user
183.) List all shortest paths to admin groups for this user
184.) List all shortest paths to sql groups for this user
185.) List all shortest paths to web groups for this user
186.) List all shortest paths to service groups for this user
187.) List all shortest paths to this user Group-Specific Cyphers
188.) List this group's RDP privileges
189.) List this group's group-delegated RDP privileges
190.) List this group's AdminTo privileges
191.) List this group's group-delegated AdminTo privileges
192.) List this group's ReadLAPSPassword privileges
193.) List this group's ReadGMSAPassword privileges
194.) List this group's Constrained Delegation privileges
195.) List this group's ForceChangePassword privileges
196.) List this group's AddMember privileges
197.) List this group's AddSelf privileges
198.) List this group's SQLAdmin privileges
199.) List this group's CanPSRemote privileges
200.) List this group's ExecuteDCOM privileges
201.) List this group's AllowedToAct privileges
202.) List this group's Owns privileges
203.) List this group's AllExtendedRights privileges
204.) List this group's AddKeyCredentialLink privileges
205.) List this group's GenericAll privileges
206.) List this group's WriteDacl privileges
207.) List this group's WriteOwner privileges
208.) List this groups's GenericWrite privileges
209.) List this groups's description
210.) List this groups's group memberships
211.) List this groups's members
212.) List all privileges for this group
213.) List all group-delegated privileges for this group
214.) List all shortest paths to high-value targets for this group
215.) List all shortest paths to Domain Admins for this group
216.) List all shortest paths to Enterprise Admins for this group
217.) List all shortest paths to Domain Controllers for this group
218.) List all shortest paths to Exchange groups for this group
219.) List all shortest paths to admin groups for this group
220.) List all shortest paths to sql groups for this group
221.) List all shortest paths to web groups for this group
222.) List all shortest paths to service groups for this group
223.) List all shortest paths to this group Computer-Specific Cyphers
224.) List this computer's AdminTo privileges
225.) List this computer's group-delegated AdminTo privileges
226.) List this computer's ReadLAPSPassword privileges
227.) List this computer's ReadGMSAPassword privileges
228.) List this computer's Constrained Delegation privileges
229.) List this computer's ForceChangePassword privileges
230.) List this computer's AddMember privileges
231.) List this computer's AddSelf privileges
232.) List this computer's SQLAdmin privileges
233.) List this computer's CanPSRemote privileges
234.) List this computer's ExecuteDCOM privileges
235.) List this computer's AllowedToAct privileges
236.) List this computer's Owns privileges
237.) List this computer's AllExtendedRights privileges
238.) List this computer's AddKeyCredentialLink privileges
239.) List this computer's GenericAll privileges
240.) List this computer's WriteDacl privileges
241.) List this computer's WriteOwner privileges
242.) List this computers's GenericWrite privileges
243.) List this computers's group memberships
244.) List all privileges for this computer
245.) List all group-delegated privileges for this computer
246.) List all shortest paths to high-value targets for this computer
247.) List all shortest paths to Domain Admins for this computer
248.) List all shortest paths to Enterprise Admins for this computer
249.) List all shortest paths to Domain Controllers for this computer
250.) List all shortest paths to Exchange groups for this computer
251.) List all shortest paths to admin groups for this computer
252.) List all shortest paths to sql groups for this computer
253.) List all shortest paths to web groups for this computer
254.) List all shortest paths to service groups for this computer
255.) List all shortest paths to this computer Regex-Specific Cyphers
256.) Search for groups matching the regex
257.) Search for users matching the regex
258.) Search for computers matching the regex
259.) Search for user descriptions matching the regex
260.) Search for group descriptions matching the regex
261.) Search for OSs matching the regex
262.) Search for GPOs matching the regex
263.) Search for Containers matching the regex
264.) Search for OUs matching the regex
```

## Examples

### List Kerberoastable Accounts

```plain
$ python3 cypherhound.py -u neo4j -p neo4j
: run 1
User 2068937977SA@OFFSEC.NL is kerberoastable
User 4290354077SA@OFFSEC.NL is kerberoastable
User 4872826279SA@OFFSEC.NL is kerberoastable
User ALFONSO_BOLTON@OFFSEC.NL is kerberoastable
User ANDERSON_MCCOY@OFFSEC.NL is kerberoastable
User ANGELIA_VASQUEZ@OFFSEC.NL is kerberoastable
User BECKY_TERRY@OFFSEC.NL is kerberoastable
User BEN_HYDE@OFFSEC.NL is kerberoastable
User BERNARD_BARBER@OFFSEC.NL is kerberoastable
[...]
```

### List Domain Admins

**Note:** Groups are listed as users, but members of the group are also listed. In the example below the group `NESTEDDAGROUP` contains users:

- CRYPT0RR-ADM
- BRANDON_LYNCH
- TANNER_ALSTON

```plain
$ python3 cypherhound.py -u neo4j -p neo4j
: run 33
User ADMINISTRATOR@OFFSEC.NL is MemberOf Domain Admins
User ALI_SANCHEZ@OFFSEC.NL is MemberOf Domain Admins
User BRANDON_LYNCH@OFFSEC.NL is MemberOf Domain Admins
User CRYPT0RR-ADM@OFFSEC.NL is MemberOf Domain Admins
User DAMIAN_DUFFY@OFFSEC.NL is MemberOf Domain Admins
User ERNIE_GUTHRIE@OFFSEC.NL is MemberOf Domain Admins
User GARTH_HARRINGTON@OFFSEC.NL is MemberOf Domain Admins
User NESTEDDAGROUP@OFFSEC.NL is MemberOf Domain Admins
User QUINN_NASH@OFFSEC.NL is MemberOf Domain Admins
User TANNER_ALSTON@OFFSEC.NL is MemberOf Domain Admins
```

## URL list

- [https://github.com/fin3ss3g0d/cypherhound](https://github.com/fin3ss3g0d/cypherhound)
