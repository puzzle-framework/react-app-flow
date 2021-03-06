import React from 'react';
import { Placeholder } from '@components';
import { CoreHelper } from '@helpers';
import {
	TFlowBackMethodOutput,
	TFlowDispatchMethodOutput,
	TFlowWatch,
	TFlowWatchCallback,
	TFlowWatchCallbackInput,
	TFlowWatchCallbackInputDispatch,
	TScreens,
	TStepOptions,
} from '@types';
import { Step } from '../step';

export class Flow {
	name: string;
	steps: Record<string, Step>;
	lastSteps: Record<number, string>;
	history: Array<string>;
	watchers: Record<TFlowWatch, TFlowWatchCallback[]>;
	fromFlowName?: string;

	constructor(name: string) {
		this.name = name;
		this.steps = {};
		this.lastSteps = {};
		this.history = [];
		this.watchers = {
			all: [],
			back: [],
			dispatch: [],
			mount: [],
		};
	}

	private get lastStepName(): string {
		return this.lastSteps[1];
	}

	private get currentStepName(): string {
		return this.lastSteps[0];
	}

	private set currentStepName(value: string) {
		this.lastSteps[1] = this.lastSteps[0];
		this.lastSteps[0] = value;
	}

	private logger = (message: string, ...args: any[]): void => {
		console.log('Flow', message, args);
	};

	private callWatchers = (type: TFlowWatch, dispatch?: TFlowWatchCallbackInputDispatch): void => {
		const data: TFlowWatchCallbackInput = {
			lastStepName: this.lastStepName,
			currentStepName: this.currentStepName !== this.lastStepName ? this.currentStepName : '__function__',
			type,
			dispatch,
		};

		this.watchers[type].forEach(fn => fn(data));

		this.watchers['all'].forEach(fn => fn(data));
	};

	addStep = <TScreensInner extends TScreens, TScreen extends TScreens[0]>(
		screen: TScreen,
		name: string,
		options?: TStepOptions
	): void => {
		const step = new Step(name as string, screen.loader, options);

		this.steps[name] = step;
	};

	addAction = (screenName: string, actionName: string, gotoScreenName: string): void => {
		const step = this.steps[screenName];

		step.actions[actionName] = gotoScreenName;
	};

	addWatcher = (callback: TFlowWatchCallback, type: TFlowWatch = 'all'): void => {
		this.watchers[type].push(callback);
	};

	start = (stepName?: string, fromFlowName?: string): void => {
		this.logger('start', { stepName, fromFlowName });

		this.fromFlowName = fromFlowName;
		const currentStepName = stepName || this.currentStepName || this.steps[Object.keys(this.steps)[0]].name;

		this.currentStepName = currentStepName;
	};

	render = (): React.ReactNode => {
		const currentStepName = this.currentStepName || this.steps[Object.keys(this.steps)[0]].name;

		this.logger('Flow > render [start]', { currentStepName });

		if (this.lastStepName !== this.currentStepName) {
			this.mount();
		}

		if (currentStepName && this.steps.hasOwnProperty(currentStepName)) {
			const Screen = this.steps[currentStepName].loader();

			return (
				<React.Suspense fallback={<Placeholder loading />}>
					<Screen />
				</React.Suspense>
			);
		}

		return null;
	};

	mount = (): void => {
		this.callWatchers('mount');
	};

	back = (): TFlowBackMethodOutput => {
		const backStepName = this.history.pop();

		if (backStepName) {
			this.currentStepName = backStepName;

			this.callWatchers('back');

			return { changed: true };
		} else if (this.fromFlowName) {
			return { changed: true, currentFlowName: this.fromFlowName };
		}

		return { changed: false };
	};

	private treatHistory = (): void => {
		if (this.currentStepName) {
			const currentStep = this.steps[this.currentStepName];

			this.logger('Flow > treatHistory', {
				currentStep,
				ignoreHistory: currentStep.options?.ignoreHistory,
			});

			// when clear history it's necessary empty history and from flow name when back not doing anything
			if (CoreHelper.getValueOrDefault(currentStep.options?.clearHistory, false)) {
				this.history = [];
				this.fromFlowName = undefined;
			}

			if (!CoreHelper.getValueOrDefault(currentStep.options?.ignoreHistory, false)) {
				this.history.push(this.currentStepName);
			}
		}
	};

	dispatch = (actionName: string, payload?: Record<string, any>): TFlowDispatchMethodOutput => {
		this.logger('Flow > dispatch [start]', {
			actionName,
			payload,
			flow: this,
		});

		const currentStep = this.currentStepName ? this.steps[this.currentStepName] : undefined;
		let nextStepNameOrFn = undefined;
		let changed = false;
		let nextStepFnResult;

		if (currentStep?.actions.hasOwnProperty(actionName)) {
			nextStepNameOrFn = currentStep.actions[actionName];

			if (typeof nextStepNameOrFn === 'string') {
				changed = this.currentStepName !== nextStepNameOrFn;

				changed && this.treatHistory();

				this.currentStepName = nextStepNameOrFn;
			} else {
				// set to current step to update lastThreeSteps
				// eslint-disable-next-line no-self-assign
				this.currentStepName = this.currentStepName;

				nextStepFnResult = nextStepNameOrFn();

				changed = true;
			}
		}

		if (changed) {
			this.callWatchers('dispatch', { actionName, payload });
		}

		this.logger('Flow > dispatch [end]', {
			nextStepNameOrFn,
			changed,
			flow: this,
		});

		return { ...nextStepFnResult, changed };
	};
}
