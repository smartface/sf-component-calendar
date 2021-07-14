import createPageContext from "@smartface/contx/lib/smartface/pageContext";
import { INIT_CONTEXT_ACTION_TYPE } from "../services/constants";
import System = require('@smartface/native/device/system');
import styler from "@smartface/styler/lib/styler";
import Context from "@smartface/contx/lib/core/Context";
import Actor from "@smartface/contx/lib/core/Actor";
import { Stylable } from "@smartface/contx/lib/styling/Stylable";
import { CalendarDayType } from "../services/CalendarDayType";

function raiseTargetNotfound(target) {
    return function (message = "Component cannot be found.") {
        throw new Error(`[${target}] ${message}`);
    };
}

function removeSelection(context, state) {
    if (!state.selectedDay)
        return;

    context
        .find(state.selectedDay, { removeClassName: raiseTargetNotfound(state.selectedDay) })
        .removeClassName(".calendar.day_label-selected");
    delete state.selectedDay;
}

function resetDays(actor) {
    // days.forEach(function(name) {
    if (actor.hasClassName(".calendar.day_label")) {
        actor.resetClassNames([".calendar.day_label"]);
    } else if (actor.hasClassName(".calendar.day")) {
        actor.resetClassNames([".calendar.day"]);
    }
    // });
}

function deselectDays(actor: Stylable) {
    // days.forEach(function(name) {
    if (actor.hasClassName(".calendar.day_label")) {
        actor.removeClassNames([".calendar.day_label-selected", ".calendar.day_label-rangeSelected"]);
    } else if (actor.hasClassName(".calendar.day")) {
        actor.removeClassNames([".calendar.day-selected"]);
    }
    // });
}

type ContextState = {
    selectedDay: string,
    days: string[],
    tomonthTargets: string[]
}

type Actions = {
    type: "updateDayType",
    data: CalendarDayType
} |
{
    type: typeof INIT_CONTEXT_ACTION_TYPE
} |
{
    type: "resetDays"
} | {
    type: "deselectDays"
} | {
    type: "daySelected"
} | {
    type: "clearSelectedDay"
} | {
    type: "changeCalendar",
    lang: string
} | {
    type: "changeMonth"
} | {
    type: "tomonth"
}

// reducer for context's components
function reducer(context: Context, action: Actions, target, state: ContextState) {
    const newState = Object.assign({}, state);
    let actor: Stylable | null;
    switch (action.type) {
        case INIT_CONTEXT_ACTION_TYPE:
            const reducer = (acc: string[], actor: Actor, name: string) => {
                if (name.indexOf("_weekDay") > 0)
                    acc.push(name);
                return acc;
            };
            newState.days = context.reduce(reducer as any, []) as string[];

            return newState;
        case "resetDays":
            context.map(resetDays as any);
            (newState.tomonthTargets || []).forEach(element => {
                actor = context.find(element as any, { pushClassNames: raiseTargetNotfound(target) }) as Stylable;
                actor.removeClassName("#" + actor.getName() + "-tomonth");
            });
            newState.tomonthTargets = [];
            return newState;
        case "deselectDays":
            context.map(deselectDays as any);

            return newState;
        case "daySelected":
            const selected = context.find(newState.selectedDay as any, null);

            if (newState.selectedDay) {
                actor = context.find(newState.selectedDay as any, { pushClassNames: raiseTargetNotfound(target) }) as Stylable;
                actor && actor.removeClassName(".calendar.day_label-selected");
            }

            if (newState.selectedDay !== target) {
                actor = context.find(target, { pushClassNames: raiseTargetNotfound(target) }) as Stylable;
                actor.pushClassNames(".calendar.day_label-selected");
                newState.selectedDay = target;
            } else {
                newState.selectedDay = null;
            }

            return newState;
        case "clearSelectedDay":
            removeSelection(context, newState);

            return newState;
        case "tomonth":
            actor = context.find(target, { pushClassNames: raiseTargetNotfound(target) }) as Stylable;
            actor.pushClassNames("#" + actor.getName() + "-tomonth");
            if (!newState.tomonthTargets)
                newState.tomonthTargets = [];
            newState.tomonthTargets.push(target);
            return newState;
        case "changeMonth":
            removeSelection(context, newState);
            return newState;
        case "changeCalendar":
            const mapFn = (actor: Stylable) => {
                if (!actor || actor.getName() === undefined)
                    raiseTargetNotfound(target);

                const className = actor.getInitialClassName();
                actor.resetClassNames([...className,
                "#" + actor.getName(),
                "#" + actor.getName() + "-lang--" + action.lang,
                "#" + actor.getName() + "-os--" + System.OS
                ]);
                // actor.pushClassName("#"+actor.name+"-os_"+System.OS);
            };
            context.map(mapFn as any);

            return newState;
        case "updateDayType":
            actor = context.find(target, null) as Stylable | null;
            if (!actor)
                return state;

            const data = action.data;
            const classNames: string[] = []

            if (data.isWeekend) {
                classNames.push(".calendar.day_label-weekend");
            }

            if (Array.isArray(data.specialDay) && data.specialDay.length > 0) {
                classNames.push(".calendar.day_label-specialDay");
                classNames.push(...data.specialDay.map(day => day.className));
            }

            if (data.month != "current") {
                classNames.push(".calendar.day_label-deactiveDays");
            }

            if (data.today) {
                classNames.push(".calendar.day_label-today");
            }

            actor.pushClassNames(classNames);

            return newState;
    }

    return state;
}


function createContext(component, name = "calendar", styles = {}) {
    let context = createPageContext(component, name, reducer as any);
    context(styler(styles));

    return function setStyle(newStyles) {
        try {
            // injects a new styling to the context
            context(styler(styles, newStyles));
        } catch (e) {
            alert(e.message);
        }
    };
}

export default createContext;
