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
  "Database Type": "database_type"
};

// Default fallback type for unmapped field types
export const DEFAULT_FIELD_TYPE = "word";