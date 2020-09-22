<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Repository\ChapitreRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(
 *      normalizationContext={"groups"={"readChapter"}},
 *      itemOperations={"get","delete","put"},
 * )
 * @ORM\Entity(repositoryClass=ChapitreRepository::class)
 */
class Chapitre
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"readChapter"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"readChapter"})
     */
    private $titre;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"readChapter"})
     */
    private $couverture;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"readChapter"})
     */
    private $date;

    /**
     * @ORM\Column(type="text")
     * @Groups({"readChapter"})
     */
    private $firstParag;

    /**
     * @ORM\Column(type="text")
     * @Groups({"readChapter"})
     */
    private $content;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="chapitres")
     * @Groups({"readChapter"})
     */
    private $author;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): self
    {
        $this->titre = $titre;

        return $this;
    }

    public function getCouverture(): ?string
    {
        return $this->couverture;
    }

    public function setCouverture(?string $couverture): self
    {
        $this->couverture = $couverture;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(?\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getFirstParag(): ?string
    {
        return $this->firstParag;
    }

    public function setFirstParag(string $firstParag): self
    {
        $this->firstParag = $firstParag;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getAuthor(): ?user
    {
        return $this->author;
    }

    public function setAuthor(?user $author): self
    {
        $this->author = $author;

        return $this;
    }
}
