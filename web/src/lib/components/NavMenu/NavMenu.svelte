<script lang="ts">
	import {
		Button,
		Navbar,
		NavBrand,
		NavUl,
		NavLi,
		NavHamburger,
		Avatar,
		Dropdown,
		DropdownItem,
		DropdownHeader
	} from 'flowbite-svelte';
	import checkIsLoggedIn from '$lib/auth/isLoggedIn';
	import { page } from '$app/stores';
	import type { User } from '$lib/types';

	export let user: Partial<User>;

	$: activeUrl = $page.url.pathname;
	let isLoggedIn = checkIsLoggedIn();
</script>

<Navbar class="border-b border-b-slate-200 px-4">
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			Psych Out
		</span>
	</NavBrand>
	<NavUl {activeUrl}>
		<NavLi href="/">Home</NavLi>
		<NavLi href="/tests">Tests</NavLi>
	</NavUl>
	<div class="flex items-center md:order-2">
		{#if isLoggedIn && user}
			<Avatar id="avatar-menu" src={user.picture} />
		{:else}
			<Button rel="external" href="/login">Sign In</Button>
		{/if}
		<NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
	</div>
	{#if isLoggedIn}
		<Dropdown placement="bottom" triggeredBy="#avatar-menu">
			{#if user}
				<DropdownHeader>
					<span class="block text-sm">{user.name}</span>
				</DropdownHeader>
			{/if}
			<DropdownItem>
				<a rel="external" href="/logout">Sign out</a>
			</DropdownItem>
		</Dropdown>
	{/if}
</Navbar>
