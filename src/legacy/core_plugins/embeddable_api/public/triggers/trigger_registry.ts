/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

export interface Trigger {
  id: string;
  title: string;
  description?: string;
  actionIds: string[];
}

class TriggerRegistry {
  constructor(private triggers: Trigger[]) {}

  public getTriggers() {
    return this.triggers;
  }

  public getTrigger(id: string) {
    return this.triggers.find(trigger => trigger.id === id);
  }

  public registerTrigger(trigger: Trigger) {
    this.triggers.push(trigger);
  }
  public reset() {
    this.triggers = [];
  }

  public detachAction({ triggerId, actionId }: { triggerId: string; actionId: string }) {
    const trigger = this.getTrigger(triggerId);
    if (!trigger) {
      throw new Error(`No trigger with is ${triggerId} exists`);
    }

    trigger.actionIds = trigger.actionIds.filter(id => id !== actionId);
  }

  public attachAction({ triggerId, actionId }: { triggerId: string; actionId: string }) {
    const trigger = this.getTrigger(triggerId);
    if (!trigger) {
      throw new Error(`No trigger with is ${triggerId} exists`);
    }

    if (!trigger.actionIds.find(id => id === actionId)) {
      trigger.actionIds.push(actionId);
    }
  }
}

export const CONTEXT_MENU_TRIGGER = 'CONTEXT_MENU_TRIGGER';
export const APPLY_FILTER_TRIGGER = 'FITLER_TRIGGER';

export const triggerRegistry = new TriggerRegistry([]);

triggerRegistry.registerTrigger({
  id: CONTEXT_MENU_TRIGGER,
  title: 'Context menu',
  actionIds: [],
});

triggerRegistry.registerTrigger({
  id: APPLY_FILTER_TRIGGER,
  title: 'Filter click',
  actionIds: [],
});
