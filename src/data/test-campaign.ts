import { CampaignData } from '../engine/design/types.js'

export const testCampaign: CampaignData = {
  "id": "demo-campaign",
  "name": "Demo Campaign",

  "paths": {
    "path-1": {
      "id": "path-1",
      "name": "Test Path",
      "path": [
        [0, 50],
        [50, 50],
        [100, 25],
        [150, 75],
        [200, 75]
      ]
    }
  },

  "creeps": {
    "basic": {
      "id": "basic",
      "name": "Basic Creep",
      "speed": 0.05,
      "maxHp": 10,
      "rewards": [
        ["money", 5],
        ["xp", 1]
      ]
    }
  },

  "bullets": {
    "bullet-1": {
      "id": "bullet-1",
      "name": "Standard Bullet",
      "damage": 3,
      "speed": 0.4 
    }
  },

  "towers": {
    "gun-1": {
      "id": "gun-1",
      "name": "Gun Tower",
      "nextId": null,
      "cost": 50,
      "sellPrice": 35,
      "bulletId": "bullet-1",
      "range": 100,  
      "firingIntervalMs": 800
    }
  },

  "levels": {
    "level-1": {
      "id": "level-1",
      "name": "First Time Around",
      "lives": 20,
      "startMoney": 100,

      "pathIds": ["path-1"],

      "waves": [
        {
          "creeps": [
            {
              "type": "group",
              "startMs": 0,
              "intervalMs": 800,
              "pathId": "path-1",
              "count": 3,
              "creepId": "basic"
            }
          ],
          "durationMs": 4000
        }
      ],

      "towerIds": ["gun-1"]
    }
  },

  "worlds": {
    "world-1": {
      "id": "world-1",
      "name": "The Beginning",
      "levelIds": ["level-1"]
    }
  },

  "worldIds": ["world-1"]
}
