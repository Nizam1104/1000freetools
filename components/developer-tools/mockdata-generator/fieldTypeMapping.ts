// Mapping between human-readable field types from the dialog and internal worker types
export const fieldTypeMapping: Record<string, string> = {
  // Personal & Identity
  "First Name": "firstName",
  "Last Name": "lastName",
  "Age": "age",
  "Full Name": "name",
  "Gender": "gender",
  "Title (Mr/Ms/Dr)": "prefix",
  "Suffix (Jr/Sr/III)": "suffix",
  "Job Title": "job_title",
  "Username": "username",
  "Password": "password",
  "GUID / UUID": "uuid",
  "Phone Number": "phone",
  
  // Contact & Digital Presence
  "Email Address": "email",
  "Domain Name": "domain_name",
  "Top Level Domain (TLD)": "tld",
  "URL": "url",
  "IP Address v4": "ip_address",
  "IP Address v6": "ip_address_v6",
  "MAC Address": "mac_address",
  "User Agent": "user_agent",
  "Avatar Image URL": "avatar_url",
  "Dummy Image URL": "image_url",
  
  // Address & Location
  "Street Address": "address",
  "Street Name": "street_name",
  "Street Number": "building_number",
  "Address Line 2 (Room/Apt/Floor/Suite)": "secondary_address",
  "City": "city",
  "State / Province": "state",
  "State / Province Abbreviation": "state_abbr",
  "Postal Code / Zip Code": "zip_code",
  "Country": "country",
  "Country Code (Alpha-2)": "country_code",
  "Latitude": "latitude",
  "Longitude": "longitude",
  "Time Zone": "timezone",
  
  // Business & Professional
  "Company Name": "company",
  "Brand Name": "brand_name",
  "Buzzword": "buzzword",
  "Catch Phrase": "catch_phrase",
  "Slogan": "slogan",
  
  // Commerce & Products
  "Product Name": "product_name",
  "Product Price": "price",
  "Product Description": "product_description",
  "Product Category": "product_category",
  "ISBN": "isbn",
  
  // Finance & Banking
  "Bank Name": "bank_name",
  "Money Amount": "price",
  "Currency": "currency",
  "Currency Code": "currency_code",
  "Credit Card Number": "credit_card",
  "Credit Card Type": "credit_card_type",
  "Bank SWIFT BIC": "bic",
  "IBAN": "iban",
  "Bank Routing Number (US)": "routing_number",
  "Bitcoin Address": "bitcoin_address",
  "Ethereum Address": "ethereum_address",
  
  // Time & Date
  "Datetime": "datetime",
  "Time": "time",
  "Date": "date",
  "Date (Past)": "date_past",
  "Date (Future)": "date_future",
  "Birthdate": "birthdate",
  
  // Text & Content
  "Word": "word",
  "Sentence": "sentence",
  "Paragraph": "paragraph",
  "Hacker Phrase": "hacker_phrase",
  
  // Data Types & Generics
  "Boolean": "boolean",
  "String": "string",
  "Number (Integer / Float)": "number",
  "Character Sequence": "character_sequence",
  "Digit Sequence": "digits",
  "Hexadecimal String": "hexadecimal",
  "Random Element from Array": "select",
  "Template String (Formula-like)": "template_string",
  "MD5 Hash": "md5",
  "SHA1 Hash": "sha1",
  "SHA256 Hash": "sha256",
  
  // System & Files
  "File Name": "file_name",
  "File Extension": "file_extension",
  "MIME Type": "mime_type",
  "App Version (Semantic Versioning)": "semver",
  
  // Vehicles
  "Car Make (Manufacturer)": "vehicle_manufacturer",
  "Car Model": "vehicle_model",
  "Car VIN": "vehicle_vin",
  "Car Type": "vehicle_type",
  "Car Color": "vehicle_color",
  
  // Animals
  "Animal Type": "animal_type",
  "Animal Common Name (Specific)": "animal_name",
  
  // Colors
  "Color Name": "color",
  "Hex Color": "hex_color",
  "RGB Color": "rgb_color",
  "RGBA Color": "rgba_color",
  
  // Music
  "Song Name": "song_title",
  "Music Genre": "music_genre",
  
  // Development & Database
  "Database Column Name": "database_column",
  "Database Type": "database_type",

  // Entertainment & Media
  "Actor Name": "actor_name",
  "Artist Name": "artist_name",
  "Album Name": "album_name",
  "Book Author": "book_author",
  "Book Genre": "book_genre",
  "Book Title": "book_title",
  "Director Name": "director_name",
  "Movie Genre": "movie_genre",
  "Movie Title": "movie_title",
  "TV Show": "tv_show",
  "TV Genre": "tv_genre",
  "Instrument": "instrument",

  // Science & Measurements
  "Material": "material",
  "Blood Type": "blood_type",
  "Temperature": "temperature",
  "Weight": "weight",
  "Length": "length",
  "Volume": "volume",
  "Speed": "speed",
  "Power": "power",
  "Voltage": "voltage",
  "Current": "current",
  "Resistance": "resistance",
  "Energy": "energy",
  "Pressure": "pressure",
  "Frequency": "frequency",
  "Duration": "duration",
  "Scale": "scale",
  "Ratio": "ratio",
  "Percentage": "percentage",

  // Technology & Development
  "API Endpoint": "api_endpoint",
  "Git Branch": "git_branch",
  "Git Commit Hash": "git_commit_hash",
  "CSS Class": "css_class",
  "CSS Property": "css_property",
  "CSS Selector": "css_selector",
  "CSS Value": "css_value",
  "HTML Attribute": "html_attribute",
  "HTML Element": "html_element",
  "HTML Tag": "html_tag",
  "HTTP Method": "http_method",
  "HTTP Status Code": "http_status_code",
  "Error Message": "error_message",
  "Content Type": "content_type",
  "Data Unit": "data_unit",
  "Memory Unit": "memory_unit",
  "Storage Unit": "storage_unit",
  "Network Protocol": "network_protocol",
  "Programming Language": "programming_language",
  "JavaScript Framework": "javascript_framework",
  "SQL Query": "sql_query",
  "Regex Pattern": "regex_pattern",
  "Validation Rule": "validation_rule",
  "Column Name": "column_name",
  "Table Name": "table_name",
  "Database Name": "database_name",
  "JSON Key": "json_key",
  "JSON Value": "json_value",

  // Business & Finance Extended
  "Industry": "industry",
  "Department": "department",
  "Currency Symbol": "currency_symbol",
  "Stock Symbol": "stock_symbol",
  "Transaction ID": "transaction_id",
  "Account Number": "iban",

  // Travel & Transportation
  "Airline": "airline",
  "Airport Code": "airport_code",
  "Flight Number": "flight_number",

  // Health & Medical
  "Doctor Name": "doctor_name",
  "Hospital Name": "hospital_name",
  "Medication": "medication",
  "Health Condition": "health_condition",

  // Geography Extended
  "County": "county",
  "Cardinal Direction": "cardinal_direction",
  "Ordinal Direction": "ordinal_direction",
  "Direction": "direction",

  // Internet & Social
  "Email Provider": "email_provider",
  "Subdomain": "subdomain",
  "Social Media Platform": "social_media_platform",
  "Hashtag": "hashtag",
  "Emoji": "emoji",

  // Localization
  "Locale": "locale",
  "Locale Code": "locale_code",
  "Language": "language",
  "Language Code": "language_code",
  "Time Zone Abbreviation": "time_zone_abbreviation",
  "Date Format": "date_format",
  "Time Format": "time_format",

  // File System
  "File Path": "file_path",
  "Directory Path": "directory_path",

  // Miscellaneous
  "Bank Account Number": "bank_name",
  "Port Number": "port_number",
  "Unit of Measurement": "unit_of_measurement",
  "Deployment Environment": "deployment_environment",
  "Phone Area Code": "phone_area_code",
  "Phone Country Code": "phone_country_code",
  "Lorem Ipsum": "lorem_ipsum",
  "Text": "text",
  "Timestamp": "timestamp"
};

// Default fallback type for unmapped field types
export const DEFAULT_FIELD_TYPE = "word";