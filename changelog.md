### 25th September

- Changing task status now persists.
- Fixed bug where a category in the 'Create Category' dialog would not be shown immediately after it was created.

### 24th September

- Brought back functionality to single-click a task to change its status, and double-click it to edit it (currently local saves only).

### 23rd September

- Can add a task to a category, and will persist.

### 14th September

- For a particular day, you can add a category and it will be displayed on the screen.

### 30th August - 3rd September

- Added database integration
- Cannot create nor save tasks yet, but when the page is loaded (showing today's date), tasks and categories for today will be fetched and displayed
- Currently adding functionality to add categories and create new ones
- Modified schema and model relations - added some more relations, while having removed some other unnecessary ones

### 22nd August 2026

- Can now update the description of a task.
- Refactored code into different components in their separate files, to clean and organise the codebase.

### 21st August 2026

- Double clicking on a task will bring up a dialog to edit the task (editing functionality does not work yet).

### 20th August 2026

- For mobile devices, tasks are displayed as a vertical list by category.
- Clicking on a task will change its 'status' (denoted by its colour). The status of a task can be: pending (uncoloured), complete (green), partially complete (yellow) or incomplete (red).
- Can add a new task to a category

### 19th August 2026

- Reinitialised project to have shadcn configured from the beginning. Adding shadcn to the existing Next.js project would not work properly.
- First making the design for smaller screens. Experimenting with design.

### 17th August 2026

- First commit.
- Can cycle between dates.
- Can add tasks.
