# supabase-cdc-to-dbos-public

This is a simple application that listens to changes in a Supabase table and inserts the changes into a DBOS postgres table.


---------------------------------------------

# sample insert

```
[
	{
		"uid": "d2771cef-fa55-4e5d-87f1-ce5203739417",
		"event_name": null,
		"event_payload": {
			"type": "INSERT",
			"table": "tempInputsData",
			"record": {
				"id": "tempId-rewwrwrwr2242424",
				"email": "test@foobar.com",
				"lastName": "Que",
				"firstName": "Susie",
				"created_at": "2024-07-28T06:12:55.800426+00:00",
				"updated_at": "2024-07-28T06:12:55.800426"
			},
			"schema": "public",
			"old_record": null
		}
	}
]
```
