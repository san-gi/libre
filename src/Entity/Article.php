<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Repository\ArticleRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(
 *      normalizationContext={"groups"={"readArticle"}},
 *      itemOperations={"get","delete","put"},)
 * @ORM\Entity(repositoryClass=ArticleRepository::class)
 */
class Article
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"readArticle"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"readArticle"})
     */
    private $titre;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"readArticle"})
     */
    private $couverture;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"readArticle"})
     */
    private $date;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"readArticle"})
     */
    private $content;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="articles")
     * @Groups({"readArticle"})
     */
    private $Author;

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

    public function setCouverture(string $couverture): self
    {
        $this->couverture = $couverture;

        return $this;
    }

    public function getDate(): ?string
    {
        return $this->date;
    }

    public function setDate(string $date): self
    {
        $this->date = $date;

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
        return $this->Author;
    }

    public function setAuthor(?user $Author): self
    {
        $this->Author = $Author;

        return $this;
    }
}
