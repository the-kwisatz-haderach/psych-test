<script lang="ts">
	import { Heading, P, A, List, Li } from 'flowbite-svelte';
</script>

<header class="mb-4">
	<Heading class="leading-relaxed">Heading</Heading>
	<P class="mb-4">
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi nulla rem natus veritatis iusto
		dolor aut quidem exercitationem. Nemo, perspiciatis.
	</P>
</header>
<section>
	<Heading class="leading-relaxed" tag="h2">Tests</Heading>
	<P>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, impedit!</P>
	<List class="mt-4">
		<Li>
			<A href="/blink">Blinking shit</A>
		</Li>
	</List>
</section>
