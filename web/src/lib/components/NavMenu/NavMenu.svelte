<script lang="ts">
	import {
		Button,
		Navbar,
		NavBrand,
		NavHamburger,
		Avatar,
		Dropdown,
		DropdownItem,
		DropdownHeader
	} from 'flowbite-svelte';
	import checkIsLoggedIn from '$lib/auth/isLoggedIn';

	let isLoggedIn = checkIsLoggedIn();
</script>

<Navbar class="px-4 border-b border-b-slate-200">
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			Psych Out
		</span>
	</NavBrand>
	<div class="flex items-center md:order-2">
		{#if isLoggedIn}
			<Avatar id="avatar-menu" src="https://picsum.photos/50" />
		{:else}
			<Button rel="external" href="/login">Sign In</Button>
		{/if}
		<NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
	</div>
	{#if isLoggedIn}
		<Dropdown placement="bottom" triggeredBy="#avatar-menu">
			<DropdownHeader>
				<span class="block text-sm">Bonnie Green</span>
				<span class="block truncate text-sm font-medium">name@flowbite.com</span>
			</DropdownHeader>
			<DropdownItem>
				<a rel="external" href="/logout">Sign out</a>
			</DropdownItem>
		</Dropdown>
	{/if}
</Navbar>
