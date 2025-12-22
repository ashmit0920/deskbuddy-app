# DeskBuddy Project Diagrams

This document contains PlantUML code for the system diagrams. You can render these using any PlantUML viewer or editor extension.

## 1. System Architecture (Component Diagram)

This diagram illustrates the high-level interaction between the Data Collection, Backend, and Frontend layers.

```plantuml
@startuml
!theme plain
skinparam componentStyle uml2

package "Client Workstation" {
    
    package "Presentation Layer (Electron)" {
        [React Frontend] as Frontend
        [Electron Main Process] as ElectronMain
    }

    package "Backend Service (FastAPI)" {
        [API Server] as API
        [Data Processor] as Processor
        [ML Inference Engine] as ML
    }

    package "Data Collection Layer" {
        [Keystroke Monitor] as KeyMon
        [Mouse Tracker] as MouseMon
        [Webcam Monitor] as CamMon
        [App Usage Tracker] as AppMon
    }

    database "Local Storage" {
        [SQLite Database] as DB
    }
}

' Relationships
Frontend <--> API : HTTP/REST
API --> DB : Read/Write
Processor --> DB : Write Aggregated Data
Processor <-- KeyMon : Raw Events
Processor <-- MouseMon : Raw Events
Processor <-- AppMon :  Active Window
ML <-- CamMon : Video Frames
ML --> Processor : Attention Score

@enduml
```

## 2. Design Level Diagrams

### A. Class Diagram (Data Models)
Represents the core data structures used in the backend and frontend types.

```plantuml
@startuml
!theme plain
hide circle
skinparam classAttributeIconSize 0

class Session {
    +id: UUID
    +user_id: String
    +start_time: DateTime
    +end_time: DateTime
    +calculateDuration(): Duration
}

class ProductivityMetric {
    +timestamp: DateTime
    +focus_score: Float
    +typing_speed: Float
    +mouse_activity: Float
    +active_window: String
}

class AttentionData {
    +timestamp: DateTime
    +is_focused: Boolean
    +face_detected: Boolean
    +head_pose: Vector3
    +blink_rate: Float
}

class UserSettings {
    +theme: String
    +auto_start: Boolean
    +camera_enabled: Boolean
    +data_retention_days: Integer
}

Session "1" *-- "many" ProductivityMetric : contains
Session "1" *-- "many" AttentionData : tracks
@enduml
```

### B. Sequence Diagram (Dashboard Data Flow)
Shows the sequence of events when a user opens the dashboard and data is fetched.

```plantuml
@startuml
!theme plain
autonumber

actor User
participant "React Frontend" as UI
participant "API Service" as Service
participant "FastAPI Backend" as Backend
database "SQLite DB" as DB

User -> UI : Opens Dashboard
activate UI

UI -> Service : fetchDashboardData()
activate Service

parallel {
    Service -> Backend : GET /analytics/daily
    Service -> Backend : GET /activity/keystrokes
    Service -> Backend : GET /activity/app_usage
}

activate Backend
Backend -> DB : Query Aggregated Stats (Day)
activate DB
DB --> Backend : Return Data
deactivate DB

Backend --> Service : JSON Response
deactivate Backend

Service --> UI : Update State (productivity, charts)
deactivate Service

UI -> UI : Render Charts & Cards
UI --> User : Display Dashboard

deactivate UI
@enduml
```

### C. Activity Diagram (Monitoring Session)
Details the logic flow of the background monitoring process.

```plantuml
@startuml
!theme plain

start
:User clicks "Start Monitoring";

fork
    :Start Keystroke Listener;
fork again
    :Start Mouse Tracker;
fork again
    :Initialize Webcam;
    if (Camera Permission Granted?) then (yes)
        :Start Face Capture;
    else (no)
        :Log Warning;
        :Disable Face Features;
    endif
end fork

repeat
    :Capture Raw Data (1s window);
    :Preprocess Data;
    
    partition "ML Inference" {
        :Detect Face;
        :Estimate Gaze;
        :Calculate Attention Score;
    }
    
    :Aggregate Metrics;
    :Save to local DB;
    :Broadcast via WebSocket (Optional);
    
repeat while (Is Monitoring Active?)

:Stop all listeners;
:Save Session Summary;
stop
@enduml
```

## 3. User Interface Diagram (Wireframe)

A high-level mockup of the application layout using PlantUML Salt.

```plantuml
@startuml
!theme plain
salt
{+
  {* DeskBuddy v1.0 | [Settings] | [Account] }
  {/
    <b>Sidebar 
    [Dashboard]
    [Daily Analysis]
    [Weekly Trends]
    [AI Assistant]
    .
    .
    [Logout]
  } | {
    <b>Dashboard
    
    { [Start Monitoring] | Status: <b>Active }
    
    .
    
    {+ 
      <b>Active Time | <b>Attention
      45 mins     | 85%
      .           | .
      <b>Tuyping    | <b>Blink Rate
      65 WPM      | 12/min
    }
    
    .
    
    {^"Typing Activity (24h)"
      [  Chart Area ........................ ]
      [  ................................... ]
    }
    
    {+
      "Top Apps"
      * VS Code (45m)
      * Chrome (20m)
      * Slack (10m)
    } | {
      "Focus Score"
      [High]
      --
      Based on gaze
      tracking
    }
  }
}
@enduml
```
