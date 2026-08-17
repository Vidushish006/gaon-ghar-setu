# Gram Setu Connect

🌾 BUILD GRAM SETU — SIMPLE, MULTILINGUAL, FARMER-FRIENDLY RURAL RESOURCE MARKETPLACE

Build a responsive, interactive, mobile-first web app called “Gram Setu”.

The app should be designed primarily from a farmer/rural user's perspective.

The most important principle is:

«A farmer should be able to open the app for the first time and immediately understand what to do without needing technical knowledge.»

Do not build a complicated corporate marketplace.

Build a simple, visual, multilingual and highly intuitive rural resource platform.

---

1. CORE CONCEPT

Gram Setu is a rural marketplace and resource-connection platform connecting:

👨‍🌾 CONSUMERS

People looking for:

- 🚜 Machines

- 🌾 Crop Residue

- 👷 Labour / Workers / Services

- 📦 Storage Space

🧑‍🌾 PROVIDERS

People who can provide:

- 🚜 Machines

- 🌾 Crop Residue

- 👷 Labour / Services

- 📦 Storage Space

The platform focuses on:

- Discovery

- Search

- Filtering

- AI-based matching

- Availability

- Booking/request

- Direct communication

- Ratings

- Demand trends

- Price recommendations

IMPORTANT:

There should be NO in-app payment gateway.

Gram Setu only helps the Consumer and Provider discover each other and connect.

The Consumer can see the Provider's phone number and contact them directly.

---

2. 🌐 LANGUAGE SELECTION — FIRST SCREEN

This is a CORE requirement.

Before the user reaches the main app, ask:

“Choose your language”

Show large language cards/buttons.

Initially support:

🇮🇳 हिंदी

🇬🇧 English

🗣️ Hinglish

Structure the application so additional Indian languages can easily be added later, such as:

- Punjabi

- Marathi

- Gujarati

- Bengali

- Tamil

- Telugu

- Kannada

- Malayalam

---

Language behavior

The selected language should control:

- Navigation

- Buttons

- Headings

- Forms

- Error messages

- Booking messages

- Filters

- Profile

- Notifications

- Help text

Save the selected language in the user's profile/preferences.

The user should also be able to change the language later from:

Profile → Settings → Language

IMPORTANT:

Do not simply translate large paragraphs.

Use short, natural, easy-to-understand language.

For example:

English:

What do you need?

Hindi:

आपको क्या चाहिए?

Hinglish:

Aapko kya chahiye?

---

3. WELCOME SCREEN

After language selection:

Show:

🌾 Gram Setu

“Gaon se Zarurat Tak”

Supporting line:

Find. Connect. Use.

Large button:

Get Started

Use a friendly agricultural visual.

---

4. AUTHENTICATION

Do NOT use username/password login.

Flow:

Mobile Number → OTP → Location → Profile Setup

---

Mobile Number

Show:

Enter your mobile number

Input:

+91 | Mobile Number

Button:

Send OTP

---

OTP

Show:

Verify your number

“Enter the OTP sent to your mobile number.”

Use 4–6 digit OTP input.

Buttons:

Verify

Resend OTP

For prototype/demo:

Simulate OTP verification.

Do not require real SMS integration.

---

5. 📍 LOCATION

After OTP:

Show:

“Where are you located?”

Two large options:

📍 Use Current Location

Simulate GPS detection for the prototype.

🏘️ Select Location Manually

Allow:

- Village/Town

- City

- District

- State

Location will later be used for:

- Distance

- Nearby listings

- Best Match

- Search

- Recommendations

---

6. 👤 PROFILE MODE SELECTION

After location:

Ask:

“How will you use Gram Setu?”

Two large cards:

👨‍🌾 Consumer

“I want to find or use resources.”

🧑‍🌾 Provider

“I want to provide resources or services.”

The user selects one.

---

7. 🔄 VERY IMPORTANT — MODE SWITCHER IN MAIN INTERFACE

The Consumer/Provider mode should NOT be hidden inside Profile or Settings.

It must be clearly visible at the top of the main interface at all times.

For example:

Header:

Gram Setu

[ 👨‍🌾 Consumer ▼ ]

or

[ 🧑‍🌾 Provider ▼ ]

When tapped, show:

Switch Mode

👨‍🌾 Consumer

🧑‍🌾 Provider

The user can switch between modes directly from the main interface.

IMPORTANT:

Switching modes should NOT require logging out.

The same account can use both modes.

Example:

A farmer can:

Consumer mode → Rent a tractor

and then switch to:

Provider mode → List their own tractor

---

8. COMMON PROFILE

Keep profile setup short.

Ask:

- Full Name

- Mobile Number

- Full Address

- Village/Town

- City

- State

- Location

Do not ask unnecessary personal information.

---

9. 🧑‍🌾 PROVIDER MODE

Provider home screen:

Header:

Namaste, [Name] 👋

Top-right/Top-center:

🧑‍🌾 Provider ▼

Main question:

“Aap kya provide karna chahte hain?”

Show four large visual cards:

🚜 Machine

“Rent / provide machines”

🌾 Crop Residue

“Sell / provide crop residue”

👷 Labour / Service

“Provide labour or skills”

📦 Storage

“Provide storage space”

Allow multiple categories.

---

10. ➕ ADD ITEM / PRODUCT

Every Provider category must have a prominent:

➕ Add New

button.

Provider can create multiple listings.

Examples:

- 2 tractors

- 1 harvester

- 3 crop residue listings

- Labour services

- Multiple storage spaces

---

11. 🗑️ REMOVE / INACTIVE ITEM

This is a CORE Provider feature.

Every Provider listing must have two simple actions:

✏️ Edit

and

🟢 Active / 🔴 Inactive

The Provider should be able to:

Add

Create a new listing.

Edit

Change details.

Make Inactive

Temporarily hide the listing from Consumer search.

Reactivate

Make the listing visible again.

Remove/Delete

Permanently remove the listing after confirmation.

---

Example

Provider's tractor listing:

Mahindra Tractor

50 HP

₹2,000/day

🟢 Active

Buttons:

Edit | Make Inactive

If provider makes it inactive:

🔴 Inactive

It should NOT appear in normal Consumer search results.

But it should remain visible to the Provider under:

My Listings → Inactive

This allows the provider to reactivate it later.

---

12. 🚜 MACHINE LISTING

Fields:

- Machine Type

- Brand

- Model

- Capacity

- Price

- Price Unit

  - Hour

  - Day

  - Acre

- Location

- Condition

- Availability

- Photos

- Description

---

13. 📸 AI-GENERATED VISUALS

Use AI-generated or high-quality generated visual placeholders for machines, crops and rural resources wherever actual user-uploaded images are not available.

The goal is to make the app visually understandable and attractive.

Examples:

Machine

Generate/show realistic Indian agricultural machinery visuals:

- Tractor

- Harvester

- Rotavator

- Thresher

- Cultivator

Crop Residue

Generate/show realistic visuals:

- Sugarcane residue

- Wheat straw

- Rice straw

- Corn residue

Storage

Generate/show:

- Rural warehouse

- Storage shed

- Grain storage

- Container storage

Labour

Use simple realistic profile illustrations/avatars rather than fake celebrity/person images.

---

IMPORTANT AI IMAGE RULE

AI-generated images should be used primarily as:

- Category illustrations

- Default listing images

- Visual placeholders

When a Provider uploads their own real photo, always prioritize the provider's real uploaded image over the generated placeholder.

Do not make AI-generated images misleadingly appear to be actual photographs of a specific provider's machine or storage facility.

Clearly treat generated visuals as illustrative when appropriate.

---

14. 📅 AVAILABILITY CALENDAR

Every bookable resource should have availability.

For:

- Machines

- Labour

- Storage

- Other bookable services

Provider selects:

Available From

Available Until

Use a simple calendar.

Show:

🟢 Available

🔴 Unavailable

The Consumer should be able to see availability before requesting/bookings.

---

15. 🌾 CROP RESIDUE

Provider can add:

- Residue Type

- Quantity

- Unit

- Price

- Location

- Availability

- Photos

- Description

Examples:

- Sugarcane residue

- Wheat straw

- Rice straw

- Corn residue

- Other

Use visually clear crop/residue images.

---

16. 👷 LABOUR / WORKER

Worker profile:

- Name

- Skills

- Experience

- Services

- Location

- Availability

- Price/rate

- Description

- Optional profile image

Example:

Ramesh Kumar

👷 Tractor Operator

Skills:

- Tractor operation

- Harvesting

- Machine handling

- Farming

Experience:

5 years

Rate:

₹800/day

---

17. 📦 STORAGE

Storage listing:

- Storage type

- Area

- Capacity

- Volume

- Location

- Price

- Availability

- Photos

- Description

Types:

- Warehouse

- Shed

- Container

- Open storage

- Other

Example:

Village Storage Shed

50 sq. metre

Capacity:

1000 kg

📍 2.5 km away

---

18. 📊 PROVIDER DASHBOARD

Keep it extremely simple.

Header:

Namaste, [Name] 👋

Mode switcher at the top:

🧑‍🌾 Provider ▼

Show:

Active Listings

12

Booking Requests

5

Upcoming

3

Completed

19

Then:

My Listings

Each listing:

Image

Name

Price

Availability

Status

Buttons:

Edit

Active/Inactive

View

---

19. 📈 AI DEMAND FORECASTING

Create a very simple AI-inspired section:

📈 Demand Trends

Do NOT show complex graphs.

Use:

📈 Increasing Demand

➡️ Stable

📉 Decreasing Demand

Example:

🌾 Sugarcane Residue

📈 High Demand

🚜 Harvesting Machine

📈 Demand Increasing

🚜 Tractor

➡️ Stable

📦 Storage

📉 Demand Decreasing

Explanation:

“Demand is based on recent activity and seasonal trends.”

Use mock/demo data for the prototype.

---

20. 💰 AI PRICE RECOMMENDATION

For Provider listings:

Show:

💰 Suggested Price

Provider enters:

₹2,500/day

System shows:

Suggested Range

₹2,200 – ₹2,600/day

Text:

“Based on nearby listings, demand and availability.”

The Provider remains in control of the final price.

Use mock AI logic for the prototype.

---

21. 👨‍🌾 CONSUMER HOME

Header:

Namaste, [Name] 👋

At the top:

👨‍🌾 Consumer ▼

Location:

📍 Jaipur

Main question:

“Aapko kya chahiye?”

Four large cards:

🚜 Machine

🌾 Crop Residue

👷 Labour / Worker

📦 Storage

These should be the most visually prominent elements on the home screen.

---

22. 🔎 SEARCH

Consumer selects a category.

Example:

Find a Machine

Search:

Search machine...

Simple filters:

📍 Distance

💰 Price

🚜 Type

⚙️ Capacity

📅 Availability

🔧 Condition

⭐ Rating

Do NOT create complicated filter screens.

Use simple dropdowns/sliders/chips.

---

23. ⭐ AI BEST MATCH

At the top of search results:

⭐ Best Match For You

Example:

Mahindra Tractor

94% Match

📍 4.2 km away

₹1,800/day

50 HP

⭐ 4.7

🟢 Available

Button:

View Details

Matching should consider:

- Distance

- Price

- Type

- Capacity

- Availability

- Condition

- Rating

Use mock AI logic for prototype.

---

24. 📋 LISTING DETAILS

Show:

Large image

Name

Rating

Price

Location

Distance

Availability

Condition

Capacity

Description

Provider name

Provider phone number

Buttons:

📞 Call Provider

📅 Book / Request

No payment.

---

25. 📞 DIRECT COMMUNICATION

Provider details:

Provider

Name

📍 Location

📞 Phone Number

Button:

Call

For prototype:

Show:

Calling provider...

Do not require real phone integration unless supported.

---

26. 📅 BOOK / REQUEST

Consumer selects:

Start Date

End Date

Then:

Send Request

Confirmation:

✅ Request Sent

“The provider can contact you to confirm the details.”

Request appears in:

Consumer → My Bookings

Provider → Booking Requests

---

27. 📊 CONSUMER DASHBOARD

Keep simple.

Upcoming

Pending

Completed

Saved

Each booking:

- Item

- Provider

- Date

- Status

Statuses:

🟡 Pending

🟢 Confirmed

🔵 Completed

---

28. ⭐ RATINGS

After completed booking:

“How was your experience?”

⭐⭐⭐⭐⭐

Optional:

Write a review

Consumer rates Provider/listing.

Display rating publicly on listings.

---

29. 🔄 MAIN NAVIGATION

Bottom navigation:

🏠 Home

🔍 Search

📅 Bookings

👤 Profile

Do not add unnecessary navigation items.

---

30. 👤 PROFILE

Show:

Profile image/icon

Name

Phone

Location

Current Mode

Language

Buttons:

Edit Profile

Switch Mode

My Listings

Language

Settings

---

31. 🌐 LANGUAGE SWITCHING

Language must also be accessible from Profile.

Example:

Language

○ हिंदी

○ English

○ Hinglish

When changed, update the interface immediately.

---

32. 🎨 DESIGN SYSTEM

Overall feeling:

Simple

Modern

Rural

Trustworthy

Warm

Accessible

Use:

- Large rounded buttons

- Large icons

- Clear cards

- Good spacing

- Large readable typography

- High contrast

- Simple illustrations

- Minimal text

Avoid:

- Tiny buttons

- Dense tables

- Complex graphs

- Too many menus

- Excessive animations

- Corporate SaaS appearance

- Dark complicated UI

---

33. 🌾 VISUAL DESIGN

Use agricultural/rural visual cues subtly:

- Fields

- Crops

- Tractors

- Villages

- Storage

- Rural workers

Do not make the app look childish.

It should feel like a professional but very simple rural technology platform.

---

34. 🧑‍🌾 FARMER-FIRST UX

Every screen should pass this test:

«“Can a farmer who is using this app for the first time understand what to press?”»

If the answer is no, simplify the screen.

Prefer:

“Aapko kya chahiye?”

over:

“Select Resource Category.”

Prefer:

“Kitni door?”

over:

“Maximum Search Radius.”

Prefer:

“Kab chahiye?”

over:

“Select required availability duration.”

---

35. 📱 RESPONSIVE DESIGN

Primary:

Mobile

Also support:

- Tablet

- Desktop

Use touch-friendly controls.

Minimum comfortable tap areas.

Readable text.

No horizontal scrolling.

---

36. 🧪 DEMO DATA

Use realistic Indian rural sample data.

Machines

- Mahindra Tractor

- Swaraj Tractor

- Harvester

- Rotavator

- Thresher

Crop Residue

- Sugarcane Residue

- Wheat Straw

- Rice Straw

- Corn Residue

Labour

- Tractor Operator

- Harvesting Worker

- Machine Operator

- General Farm Labour

Storage

- Village Warehouse

- Storage Shed

- Container Storage

Use realistic rural Indian locations.

---

37. ⚡ INTERACTIVITY

This must be a functional interactive prototype, NOT a static collection of screens.

Implement working interactions for:

- Language selection

- Get Started

- Mobile number

- OTP simulation

- Location

- Consumer/Provider selection

- Main mode switching

- Profile setup

- Add listing

- Edit listing

- Activate listing

- Deactivate listing

- Delete listing

- Search

- Filters

- Best Match

- Listing details

- Calendar

- Booking request

- Booking history

- Provider dashboard

- Consumer dashboard

- Demand indicators

- Price recommendation

- Rating

- Language switching

- Back navigation

- Bottom navigation

Use local/mock data for the prototype.

---

38. 🔄 IMPORTANT MODE LOGIC

Consumer and Provider should NOT behave like two completely separate accounts.

One account can have both capabilities.

Example:

User opens app as:

👨‍🌾 Consumer

They can search for:

🚜 Tractor

Then switch from the top:

🧑‍🌾 Provider

They can see:

My Tractor

and manage its listing.

This should happen without logging out.

---

39. PROVIDER ITEM STATUS LOGIC

Every listing must have:

🟢 Active

Visible to Consumers.

🔴 Inactive

Hidden from Consumer search.

🗑️ Deleted

Removed from active listings.

Provider can:

Add → Edit → Activate → Deactivate → Reactivate → Delete

Make these actions very easy to understand.

---

40. 🚫 PAYMENT RULE

Absolutely NO:

- Payment gateway

- Wallet

- Online payment

- Checkout

- Platform commission

The platform only facilitates:

Discover → Match → Request → Connect → Communicate

Consumer and Provider handle the final transaction independently.

---

41. AI FEATURES

The prototype should clearly demonstrate three AI-powered features:

1. ⭐ AI Best Match

Find the best resource based on:

Distance + Price + Type + Capacity + Availability + Condition + Rating.

2. 📈 AI Demand Forecasting

Show:

Increasing / Stable / Decreasing demand.

3. 💰 AI Price Recommendation

Suggest a reasonable price range based on:

Nearby listings + demand + availability.

These can use mock/sample logic for the prototype.

---

42. AI-GENERATED VISUAL CONTENT

Where real provider images are unavailable, use AI-generated illustrative visuals for:

- Agricultural machines

- Crops

- Crop residue

- Storage spaces

- Rural agricultural environments

Make the visuals:

- Realistic

- Indian/rural context

- Clean

- Professional

- Consistent in style

Use generated images as visual support rather than pretending they are actual provider-owned assets.

Provider-uploaded real photos should always take priority.

---

43. PRIORITY USER JOURNEY

Make this Consumer journey work perfectly:

Language

↓

Welcome

↓

Mobile Number

↓

OTP

↓

Location

↓

Choose Consumer

↓

Profile

↓

Consumer Home

↓

Choose Machine

↓

Filters

↓

AI Best Match

↓

Listing Details

↓

Availability Calendar

↓

Book / Request

↓

Request Sent

↓

My Bookings

↓

Call Provider

↓

Rating

---

44. PROVIDER JOURNEY

Make this Provider journey work perfectly:

Language

↓

Welcome

↓

Mobile Number

↓

OTP

↓

Location

↓

Choose Provider

↓

Profile

↓

Choose Machine / Residue / Labour / Storage

↓

Add Listing

↓

Upload Photo / AI Visual Placeholder

↓

Set Price

↓

Set Availability

↓

Publish

↓

Provider Dashboard

↓

Booking Request

↓

Demand Forecast

↓

Suggested Price

↓

Manage Listing

↓

Active / Inactive / Edit / Delete

---

45. FINAL PRODUCT VISION

Gram Setu should immediately communicate:

«“Gaon mein jo resource available hai, use uss insaan tak pahunchana jise uski zarurat hai.”»

The platform should feel like a digital bridge between rural consumers and local providers.

The final product should prioritize:

Farmer Friendliness

→ Simplicity

→ Multilingual Access

→ Location-Based Discovery

→ AI Matching

→ Resource Availability

→ Direct Connection

→ Easy Provider Management

Do not overbuild.

Build the core experience exceptionally well before adding secondary features.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://gaon-ghar-setu.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/932590e1-81da-44d3-9959-c265a3194789).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
