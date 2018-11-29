# Genetics

## Chromosomes

In *The Life Engine*, chromosomes are bit representations between 000 and 255. I won't lie, I used this representations rather than the more realistic [DNA codon table][codon-table] because it's a lot easier for me to comprehend. We may convert things to the codon table eventually... once I'm smarter. 🤓

## DNA

DNA is made up of a configurable number of [Chromosomes][chromosomes]. It currently defaults to 6, but that number will grow as creatures become more complex, and I *think* they'll eventually end up changing as part of the mutation and replication processes.

## Genotypes

Each entity contains a [Genotype][genotype] made up of several strands of DNA. One of the strands of DNA will be selected as the prime strand, from which the creature's phenotype will be generated.

## Phenotypes

Just like in reality, a creature's [Phenotype][phenotype] is generated from it's genotype. This contains information like size, color, consumption rate, gestation period, etc.

**Note:**
This is *not* the right way to do it. DNA in *The Life Engine* will eventualy be converted to double helices, and phenotypes will calculate dominant and recessive traits from that. For now, I'm gonna do it wrong because it's easier and I said so. ❤️

As creatures grow more complicated their phenotype will also adapt to appropriately represent their physical make up. Eventually, the phenotype will start to leverage both nature (the DNA the creature is born with) and nurture (the effects of the environment on the creature). It's gonna be *awesome*.





[chromosomes]: #chromosomes
[codon-table]: https://en.wikipedia.org/wiki/DNA_codon_table
[dna]: #dna
[genotype]: #genotypes
[phenotype]: #phenotypes
